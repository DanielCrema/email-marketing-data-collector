const findEmailInSheet = require('./findEmailInSheet');
const findFirstEmptyRow = require('./findFirstEmptyRow');
const generateUpdateRequest = require('./generateUpdateRequest');

async function validateAndLogEmail(googleSheets, auth, spreadsheetId, data, email, emailColumn, securityCopyColumn) {
  try {
    emailColumn = emailColumn - 1;
    securityCopyColumn = securityCopyColumn - 1;
    let { emailFound, rowIndex } = findEmailInSheet(data, email, emailColumn, securityCopyColumn);
    if (!emailFound) {
      rowIndex = findFirstEmptyRow(data, emailColumn, securityCopyColumn);
    }

    const emailUpdateRequest = generateUpdateRequest(auth, spreadsheetId, rowIndex, emailColumn, email, "");
    const securityCopyUpdateRequest = generateUpdateRequest(auth, spreadsheetId, rowIndex, securityCopyColumn, email, "");
    googleSheets.spreadsheets.values.update(emailUpdateRequest);
    googleSheets.spreadsheets.values.update(securityCopyUpdateRequest);

    return rowIndex
  } catch (error) {
    throw error
  }
}

module.exports = validateAndLogEmail;