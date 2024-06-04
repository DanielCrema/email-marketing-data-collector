const codec = require('./codec');
const decoder = new codec();

async function fetchParameters(req) {
  try {
    let email = "";
    let event = "";
    const emailRegex = /[^\s@]+@[^\s@]+\.[^\s@\W]+/g;
    const queryEmailTest = emailRegex.test(decoder.decode(req.query.ticket))
    if (queryEmailTest) {
      email = decoder.decode(req.query.ticket)
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