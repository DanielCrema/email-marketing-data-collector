const generateUpdateRequest = require("./generateUpdateRequest");

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

    const now = new Date(Date.now());
    const hoursNow = now.getHours().toString().padStart(2, '0');
    const timestamp = new Date().toISOString();
    const formattedTimestamp = timestamp.replace(/T\d\d/, `T${hoursNow}`).replace("T", " T ");
    const formattedStack = error.stack.replace(/\n/g, "   ||   ").replace(/\s\s\s\s/g, "");


    // Log the errors
    const errorTimestampLogRequest = generateUpdateRequest(auth, spreadsheetId, row, errorTimestampColumn, formattedTimestamp, `Sheet1!Z${row}`);
    const errorLogRequest = generateUpdateRequest(auth, spreadsheetId, row, errorTimestampColumn, error.message, `Sheet1!AA${row}`);
    const errorStackLogRequest = generateUpdateRequest(auth, spreadsheetId, row, errorTimestampColumn, formattedStack, `Sheet1!AB${row}`);

    await googleSheets.spreadsheets.values.update(errorTimestampLogRequest);
    await googleSheets.spreadsheets.values.update(errorLogRequest);
    await googleSheets.spreadsheets.values.update(errorStackLogRequest);
  } catch (error) {
    const now = new Date(Date.now());
    const hoursNow = now.getHours().toString().padStart(2, '0');
    const timestamp = new Date().toISOString();
    const formattedTimestamp = timestamp.replace(/T\d\d/, `T${hoursNow}`).replace("T", " T ");

    console.log(`! ! ! ERRO NA FUNÇÃO LOGERRORS`);
    console.log(`==> ${formattedTimestamp} => ${error.message} // ${error.stack.replace(/\n/g, "   ||   ").replace(/\s\s\s\s/g, "")}`)
  }
}

module.exports = logErrors;