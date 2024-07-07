const moment = require('moment-timezone');
const generateBatchUpdateRequest = require("./generateBatchUpdateRequest");

async function logErrors(googleSheets, auth, spreadsheetId, data, error, errorTimestampColumn, errorLogColumn, errorStackLogColumn) {
  try {
    let row;
    for (let i = 2; i < data.length; i++) {
      if (!data[i][errorLogColumn - 1]) { // Check if the cell is empty
        row = i + 1;
        break;
      }
    }
    if (row === null || row === undefined) {
      row = data.length + 1;
    }

    const now = moment().tz('America/Sao_Paulo');
    const formattedTimestamp = now.format('DD-MM-YYYY || HH:mm:ss.SSS');
    const formattedStack = error.stack.replace(/\n/g, "   ||   ").replace(/\s\s\s\s/g, "");

    // Log the errors
    const updates = [
      { row, column: errorTimestampColumn, value: formattedTimestamp, range: `Sheet1!AB${row}` },
      { row, column: errorLogColumn, value: error.message, range: `Sheet1!AC${row}` },
      { row, column: errorStackLogColumn, value: formattedStack, range: `Sheet1!AD${row}` }
    ]

    const batchUpdateRequest = generateBatchUpdateRequest(auth, spreadsheetId, updates);
    
    // Implementing exponential backoff strategy
    let retryCount = 0;
    const maxTries = 3;
    const initialDelay = 300;

    while (retryCount < maxTries) {
      try {
        await googleSheets.spreadsheets.values.batchUpdate(batchUpdateRequest);
        break; // If the request succeeds, break out of the loop
      } catch (error) {
        if (retryCount === maxTries - 1) {
          throw error; // If it's the last retry, throw the error
        }
        retryCount++;
        const delay = initialDelay * Math.pow(2, retryCount); // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  } catch (error) {
    const now = moment().tz('America/Sao_Paulo');
    const formattedTimestamp = now.format('DD-MM-YYYY || HH:mm:ss.SSS');
    console.log(`! ! ! ERRO NA FUNÇÃO LOGERRORS`);
    console.log(`==> ${formattedTimestamp} => ${error.message} // ${error.stack.replace(/\n/g, "   ||   ").replace(/\s\s\s\s/g, "")}`);
  }
}

module.exports = logErrors;