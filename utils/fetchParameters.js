const codec = require('./codec');

async function fetchParameters(req) {
  try {
    let email = "";
    let event = "";
    let missingButtonsAtEmail = false;
    const emailRegex = /[^\s@]+@[^\s@]+\.[^\s@\W]+/g;
    if (req.query.ticket) {
      const decoder = new codec();
      const encodedQueryTicket = req.query.ticket;
      const decodedQueryTicket = decoder.decode(encodedQueryTicket);
      const queryEmailTest = emailRegex.test(decodedQueryTicket);
      if (queryEmailTest) {
        email = decodedQueryTicket;
      }
      if (req.query.missing) {
        missingButtonsAtEmail = req.query.missing;
      }
      if (req.query.site) {
        event = "Site"
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
    }
    return { email, event, missingButtonsAtEmail }
  } catch (error) {
    throw error
  }
}

module.exports = fetchParameters;