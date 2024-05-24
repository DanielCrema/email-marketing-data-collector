async function getRedirectUrl(req) {
  try {
    let redirectUrl = "";
    if (req.query.redir !== null && req.query.redir !== undefined && req.query.redir !== "") {
      redirectUrl = req.query.redir;
    }
    return redirectUrl;
  } catch (error) {
    throw error
  }
}

module.exports = getRedirectUrl;