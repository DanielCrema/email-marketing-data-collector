const generateBatchUpdateRequest = require('./generateBatchUpdateRequest');

async function logEvents(googleSheets, auth, spreadsheetId, data, row, missingButtonsColumns, eventColumn, totalEventCountColumn, eventCounter, totalCounter, metricsRow, metricsColumn, formattedDate) {
    try {
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

        // Implementing exponential backoff strategy
        let retryCount = 0;
        const maxTries = 4;
        const initialDelay = 250;

        while (retryCount < maxTries) {
            try {
                await googleSheets.spreadsheets.values.batchUpdate(batchUpdateRequest);
                break; // If the request succeeds, break out of the loop
            } catch (error) {
                if (retryCount === maxTries - 1) {
                    throw error; // If it's the last retry, throw the error
                }
                retryCount++;
                const delay = initialDelay * Math.pow(2, retryCount); // Exponential backoff
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    } catch (error) {
        throw error
    }
}

module.exports = logEvents;