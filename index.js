require('dotenv').config();
const express = require("express");
const { google } = require("googleapis");
const moment = require('moment-timezone');
const app = express();
const port = process.env.PORT || 4000;

const validateSource = require('./utils/validateSource');
const getRedirectUrl = require('./utils/getRedirectUrl');
const fetchParameters = require('./utils/fetchParameters');
const handleParameters = require('./utils/handleParameters');
const validateAndLogEmail = require('./utils/validateAndLogEmail');
const validateCellContent = require('./utils/validateCellContent');
const getTimeData = require('./utils/getTimeData');
const timeoutCheck = require('./utils/timeoutCheck');
const validateEmailSent = require('./utils/validateEmailSent');
const logEvents = require('./utils/logEvents');
const logErrors = require('./utils/logErrors');
const confirmLog = require('./utils/confirmLog');
const generateOutput = require('./utils/generateOutput');


app.get("/", async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
  });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client })

  const spreadsheetId = process.env.GOOGLE_SPREED_SHEET_ID;

  // Get metadata about spreadsheet
  // const metaData = await googleSheets.spreadsheets.get({
  // auth,
  // spreadsheetId
  // });

  // Read rows from spreadsheet
  const sheet = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Sheet1",
  });

  const data = sheet.data.values;

  async function main() {
    const validatedSource = await validateSource(req);
    const { email, event, missingButtonsAtEmail } = await fetchParameters(req);
    let redirectUrl;

    if (validatedSource === true) {
      try {
        redirectUrl = await getRedirectUrl(req);

        if (redirectUrl !== "" && event != "") {

          const columnSite = 7;
          const columnApresentacao = 8;
          const columnWhatsapp = 9;
          const columnYoutube = 10;
          const columnSpotify = 11;
          const columnFacebook = 12;
          const columnInstagram = 13;
          const columnTiktok = 14;

          if (email !== "") {
            const emailColumn = 3;
            const emailSentColumn = 4;
            const totalEventCountColumn = 6;
            const securityCopyColumn = 15;
            const ticketColumn = 16;
            const metricsColumn = 19;
            const metricsRows = {
              site: 11,
              apresentacao: 12,
              whatsapp: 13,
              youtube: 14,
              spotify: 15,
              facebook: 16,
              instagram: 17,
              tiktok: 18,
            }

            const row = await validateAndLogEmail(googleSheets, auth, spreadsheetId, data, email, emailColumn, securityCopyColumn, ticketColumn, req.query.ticket);
            const { eventColumn, metricsRow, missingButtonsColumns } = await handleParameters(event, metricsRows, missingButtonsAtEmail, columnSite, columnApresentacao, columnWhatsapp, columnYoutube, columnSpotify, columnFacebook, columnInstagram, columnTiktok);
            const { formattedDate, year, month, day, hours, minutes } = await getTimeData();
            const validatedTimeout = await timeoutCheck(data, row, eventColumn, year, month, day, hours, minutes);
            const validatedEmailSent = await validateEmailSent(data, row, emailSentColumn);
            if (validatedEmailSent && validatedTimeout) {
              const { eventCounter, totalCounter } = await validateCellContent(data, row, eventColumn, totalEventCountColumn);
              await logEvents(googleSheets, auth, spreadsheetId, data, row, missingButtonsColumns, eventColumn, totalEventCountColumn, eventCounter, totalCounter, metricsRow, metricsColumn, formattedDate);
              const logConfirmed = await confirmLog(googleSheets, auth, spreadsheetId, row, eventColumn, minutes);
              if (!logConfirmed) {
                const errorTimestampColumn = 28;
                const errorLogColumn = 29;
                const errorStackLogColumn = 30;

                const error = {
                  message: `! ! ! Failed to log an event`,
                  stack: ` ==> EVENT: ${event} || USER: ${email}`
                }
                logErrors(googleSheets, auth, spreadsheetId, data, error, errorTimestampColumn, errorLogColumn, errorStackLogColumn);
                console.log(error.message);
                console.log(error.stack);
              }
            }
          }
        }
      } catch (error) {
        const errorTimestampColumn = 28;
        const errorLogColumn = 29;
        const errorStackLogColumn = 30;
        logErrors(googleSheets, auth, spreadsheetId, data, error, errorTimestampColumn, errorLogColumn, errorStackLogColumn);
      }
    }

    const output = generateOutput(validatedSource, redirectUrl, event);
    return output
  }

  try {
    const output = await main();
    res.send(output.output);
  } catch (error) {
    const errorTimestampColumn = 28;
    const errorLogColumn = 29;
    const errorStackLogColumn = 30;
    logErrors(googleSheets, auth, spreadsheetId, data, error, errorTimestampColumn, errorLogColumn, errorStackLogColumn);
    const now = moment().tz('America/Sao_Paulo');
    const formattedTimestamp = now.format('DD-MM-YYYY || HH:mm:ss.SSS');

    console.log(`! ! ! ! ! ERRO NO BLOCO CATCH DA RESPOSTA À SOLICITAÇÃO`);
    console.log(`==> ${formattedTimestamp} => ${error.message} // ${error.stack.replace(/\n/g, "   ||   ").replace(/\s\s\s\s/g, "")}`)
  }
});

app.listen(port, (req, res) => {
  console.log("running on port ", port)
});