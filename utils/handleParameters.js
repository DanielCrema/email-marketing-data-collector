async function handleParameters(event, metricsRows, columnApresentacao, columnWhatsapp, columnYoutube, columnSpotify, columnFacebook, columnInstagram, columnTiktok) {
  try {
    let eventColumn;
    let metricsRow;

    if (event === "Apresentacao") {
      eventColumn = columnApresentacao;
      metricsRow = metricsRows.apresentacao
    };
    if (event === "Whatsapp") {
      eventColumn = columnWhatsapp;
      metricsRow = metricsRows.whatsapp
    };
    if (event === "Youtube") {
      eventColumn = columnYoutube;
      metricsRow = metricsRows.youtube
    };
    if (event === "Spotify") {
      eventColumn = columnSpotify;
      metricsRow = metricsRows.spotify
    };
    if (event === "Facebook") {
      eventColumn = columnFacebook;
      metricsRow = metricsRows.facebook
    };
    if (event === "Instagram") {
      eventColumn = columnInstagram;
      metricsRow = metricsRows.instagram
    };
    if (event === "Tiktok") {
      eventColumn = columnTiktok;
      metricsRow = metricsRows.tiktok
    };

    return { eventColumn, metricsRow }
  } catch (error) {
    throw error
  }
}

module.exports = handleParameters;