async function validateEmailSent(data, row, emailSentColumn) {
  try {
    const emailSentCellContent = data[row - 1][emailSentColumn - 1];
    const regex = /\d+x : \d/;
    const validatedEmailSent = regex.test(emailSentCellContent);

    return validatedEmailSent;
  } catch (error) {
    throw error
  }
}

module.exports = validateEmailSent;