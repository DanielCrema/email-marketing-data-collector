async function fetchParameters(req) {
  try {
    let email = "";
    let event = "";
    const emailRegex = /[^\s@]+@[^\s@]+\.[^\s@]+/g;
    const queryEmailTest = emailRegex.test(req.query.email)
    if (queryEmailTest) {
      email = req.query.email
    }
    if (req.query.apresentacao) {
      event = "Apresentacao"
    }
    if (req.query.whatsapp) {
      event = "Whatsapp"
    }
    if (req.query.youtube) {
      event = "Youtube"
    }
    if (req.query.spotify) {
      event = "Spotify"
    }
    if (req.query.facebook) {
      event = "Facebook"
    }
    if (req.query.instagram) {
      event = "Instagram"
    }
    if (req.query.tiktok) {
      event = "Tiktok"
    }

    return { email, event }
  } catch (error) {
    throw error
  }
}

module.exports = fetchParameters;