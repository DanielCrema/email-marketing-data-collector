async function validateSource(req) {
  try {
    let isValid = false;
    if (req.query.validate === "8e7nA3") {
      isValid = true;
    }
    return isValid
  } catch (error) {
    throw error
  }
}

module.exports = validateSource;