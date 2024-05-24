async function confirmLog(googleSheets, auth, spreadsheetId, row, eventColumn, minutes) {
    try {
        eventColumn = eventColumn - 1;
        let logConfirmed = false;
        const nowMinutes = parseInt(minutes);

        const range = `Sheet1!${String.fromCharCode(65 + eventColumn)}${row}`;
        const cell = await googleSheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range
        })
        const cellContent = cell.data.values[0][0];

        const regex = /:\d\dh/
        const firstMatch = cellContent.match(regex);
        const filterRegex = /\d\d/
        const minutesMatch = firstMatch[0].match(filterRegex);
        const logMinutes = parseInt(minutesMatch);
        if (cellContent && nowMinutes <= logMinutes + 2 || nowMinutes == 59 && logMinutes <= 1) {
            logConfirmed = true;
        }

        return logConfirmed
    } catch (error) {
        throw error
    }
}

module.exports = confirmLog;