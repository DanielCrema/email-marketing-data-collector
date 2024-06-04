const generateUpdateRequest = require('./generateUpdateRequest');

async function logEvents(googleSheets, auth, spreadsheetId, data, row, eventColumn, totalEventCountColumn, eventCounter, totalCounter, metricsRow, metricsColumn, formattedDate) {
    try {
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        eventColumn = eventColumn - 1;
        totalEventCountColumn = totalEventCountColumn - 1;
        metricsColumn = metricsColumn - 1;
        metricsRow = metricsRow - 1;

        const eventMetricsLog = data[metricsRow][metricsColumn];
        const eventMetrics = parseInt(eventMetricsLog) + 1;

        const eventUpdateRequest = generateUpdateRequest(auth, spreadsheetId, row, eventColumn, `Aberto ${eventCounter}x : ${formattedDate}`, "");
        const totalEventsUpdateRequest = generateUpdateRequest(auth, spreadsheetId, row, totalEventCountColumn, `Total Eventos ${totalCounter}x - Última ação: ${formattedDate}`, "");
        const metricsUpdateRequest = generateUpdateRequest(auth, spreadsheetId, `${metricsRow + 1}`, metricsColumn, `${eventMetrics}`, "");

        await googleSheets.spreadsheets.values.update(eventUpdateRequest);
        await delay(300);
        await googleSheets.spreadsheets.values.update(totalEventsUpdateRequest);
        await delay(300);
        await googleSheets.spreadsheets.values.update(metricsUpdateRequest);
        await delay(300);
    } catch (error) {
        throw error
    }
}

module.exports = logEvents;