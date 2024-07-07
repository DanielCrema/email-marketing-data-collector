const generateBatchUpdateRequest = require('./generateBatchUpdateRequest');

async function logEvents(googleSheets, auth, spreadsheetId, data, row, missingButtonsColumns, eventColumn, totalEventCountColumn, eventCounter, totalCounter, metricsRow, metricsColumn, formattedDate) {
    try {
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        eventColumn = eventColumn - 1;
        totalEventCountColumn = totalEventCountColumn - 1;
        metricsColumn = metricsColumn - 1;
        metricsRow = metricsRow - 1;

        const eventMetricsLog = data[metricsRow][metricsColumn];
        const eventMetrics = parseInt(eventMetricsLog) + 1;

        const updates = [
            { row, column: eventColumn, value: `Aberto ${eventCounter}x : ${formattedDate}` },
            { row, column: totalEventCountColumn, value: `Total Eventos ${totalCounter}x - Última ação: ${formattedDate}` },
            { row: metricsRow + 1, column: metricsColumn, value: `${eventMetrics}` }
        ];

        if (missingButtonsColumns) {
            missingButtonsColumns.forEach((column) => {
                column = column - 1;
                updates.push({ row, column, value: "NÃO ENVIADO NO EMAIL" });
            });
        }

        const batchUpdateRequest = generateBatchUpdateRequest(auth, spreadsheetId, updates);
        await googleSheets.spreadsheets.values.batchUpdate(batchUpdateRequest);
        await delay(1100)
    } catch (error) {
        throw error
    }
}

module.exports = logEvents;