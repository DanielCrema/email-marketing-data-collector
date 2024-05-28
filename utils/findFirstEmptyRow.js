function findFirstEmptyRow(data, emailColumn, securityCopyColumn) {
  try {
    if (!data) {
      return 1
    } else {
      // Loop through the rows to find the first empty cell in the specified column
      for (let i = 0; i < data.length; i++) {
        if (!data[i][emailColumn] && !data[i][securityCopyColumn]) { // Check if the cell is empty
          return i + 1; // Return the row index (1-based) where the first empty cell is found
        }
      }
      // If no empty cell is found, return the next row (the end of the current data)
      return data.length + 1;
    }
  } catch (error) {
    throw error
  }
}

module.exports = findFirstEmptyRow;