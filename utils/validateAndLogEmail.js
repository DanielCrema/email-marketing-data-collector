const findEmailInSheet = require('./findEmailInSheet');
const findFirstEmptyRow = require('./findFirstEmptyRow');
const generateBatchUpdateRequest = require('./generateBatchUpdateRequest');

async function validateAndLogEmail(googleSheets, auth, spreadsheetId, data, email, emailColumn, securityCopyColumn, ticketColumn, ticket) {
  try {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    emailColumn = emailColumn - 1;
    securityCopyColumn = securityCopyColumn - 1;
    ticketColumn = ticketColumn - 1;

    // Seek for the email in the sheet.
    // If found, return the index. Else, call findFirstEmptyRow to return the first empty row index
    let { emailFound, rowIndex } = findEmailInSheet(data, email, emailColumn, securityCopyColumn);
    if (!emailFound) {
      rowIndex = findFirstEmptyRow(data, emailColumn, securityCopyColumn);
    }

    // Check if there are any missing information in email, security copy and cryptographed email ticket columns
    // If so, logs the info in the sheet. Else, skip to the return statement
    if (!data[rowIndex - 1][emailColumn] || !data[rowIndex - 1][securityCopyColumn] || !data[rowIndex - 1][ticketColumn]) {
      const updates = [
        { row: rowIndex, column: emailColumn, value: email },
        { row: rowIndex, column: securityCopyColumn, value: email },
        { row: rowIndex, column: ticketColumn, value: ticket }
      ];
  
      const batchUpdateRequest = generateBatchUpdateRequest(auth, spreadsheetId, updates);
      await googleSheets.spreadsheets.values.batchUpdate(batchUpdateRequest);
      await delay(1100);
    }
    return rowIndex
  } catch (error) {
    throw error
  }
}

module.exports = validateAndLogEmail;