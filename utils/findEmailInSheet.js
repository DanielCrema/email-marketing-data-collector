function findEmailInSheet(data, email, emailColumn, securityCopyColumn) {
  try {
    const emailRegex = new RegExp(email);
    let emailFound = false;
    let rowIndex = -1;

    // Find the row with the specific string
    for (let i = 0; i < data.length; i++) {
      if (emailRegex.test(data[i][emailColumn])) {
        rowIndex = i + 1; // Store the 1-based index of the found row
        break; // Exit the loop once the string is found
      }
    }
    if (rowIndex === -1) {
      for (let i = 0; i < data.length; i++) {
        if (emailRegex.test(data[i][securityCopyColumn])) {
          rowIndex = i + 1;
          break;
        }
      }
    }

    if (rowIndex !== -1) {
      emailFound = true;
    }
    return { emailFound, rowIndex };
  } catch (error) {
    throw error
  }
}

module.exports = findEmailInSheet;