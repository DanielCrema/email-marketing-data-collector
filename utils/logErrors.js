const moment = require('moment-timezone');
const generateBatchUpdateRequest = require("./generateBatchUpdateRequest");

async function logErrors(googleSheets, auth, spreadsheetId, data, error, errorTimestampColumn, errorLogColumn, errorStackLogColumn) {
  try {
    let row;
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
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
      { row, column: errorTimestampColumn, value: error.message, range: `Sheet1!AC${row}` },
      { row, column: errorTimestampColumn, value: formattedStack, range: `Sheet1!AD${row}` }
    ]

    const batchUpdateRequest = generateBatchUpdateRequest(auth, spreadsheetId, updates);
    await googleSheets.spreadsheets.values.batchUpdate(batchUpdateRequest);
    await delay(1100);
  } catch (error) {
    const now = moment().tz('America/Sao_Paulo');
    const formattedTimestamp = now.format('DD-MM-YYYY || HH:mm:ss.SSS');
    console.log(`! ! ! ERRO NA FUNÇÃO LOGERRORS`);
    console.log(`==> ${formattedTimestamp} => ${error.message} // ${error.stack.replace(/\n/g, "   ||   ").replace(/\s\s\s\s/g, "")}`)
  }
}

module.exports = logErrors;