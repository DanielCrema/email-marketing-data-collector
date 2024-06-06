async function handleParameters(event, metricsRows,  missingButtonsAtEmail, columnSite, columnApresentacao, columnWhatsapp, columnYoutube, columnSpotify, columnFacebook, columnInstagram, columnTiktok) {
  try {
    let eventColumn;
    let metricsRow;
    let missingButtonsColumns = [];

    if (missingButtonsAtEmail) {
      missingButtonsColumns = [];
      const siteRegex = /site/
      const apresentacaoRegex = /apresentacao/
      const whatsappRegex = /whatsapp/
      const youtubeRegex = /youtube/
      const spotifyRegex = /spotify/
      const facebookRegex = /facebook/
      const instagramRegex = /instagram/
      const tiktokRegex = /tiktok/

      if (siteRegex.test(missingButtonsAtEmail)) {
        missingButtonsColumns.push(columnSite);
      };
      if (apresentacaoRegex.test(missingButtonsAtEmail)) {
        missingButtonsColumns.push(columnApresentacao);
      };
      if (whatsappRegex.test(missingButtonsAtEmail)) {
        missingButtonsColumns.push(columnWhatsapp);
      };
      if (youtubeRegex.test(missingButtonsAtEmail)) {
        missingButtonsColumns.push(columnYoutube);
      };
      if (spotifyRegex.test(missingButtonsAtEmail)) {
        missingButtonsColumns.push(columnSpotify);
      };
      if (facebookRegex.test(missingButtonsAtEmail)) {
        missingButtonsColumns.push(columnFacebook);
      };
      if (instagramRegex.test(missingButtonsAtEmail)) {
        missingButtonsColumns.push(columnInstagram);
      };
      if (tiktokRegex.test(missingButtonsAtEmail)) {
        missingButtonsColumns.push(columnTiktok);
      };
    };


    if (event === "Site") {
      eventColumn = columnSite;
      metricsRow = metricsRows.site
    };
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

    return { eventColumn, metricsRow, missingButtonsColumns }
  } catch (error) {
    throw error
  }
}

module.exports = handleParameters;