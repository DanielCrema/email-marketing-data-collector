const moment = require('moment-timezone');

function generateUpdateRequest(auth, spreadsheetId, row, column, value, range) {
    try {
        if (range === "") {
            range = `Sheet1!${String.fromCharCode(65 + column)}${row}`;
        }
        const updateRequest = {
            auth,
            spreadsheetId,
            range: range,
            valueInputOption: 'USER_ENTERED',
            resource: {
                values: [
                    [value]
                ]
            }
        };

        return updateRequest;
    } catch (error) {
        const now = moment().tz('America/Sao_Paulo');
        const formattedTimestamp = now.format('DD-MM-YYYY || HH:mm:ss.SSS');

        console.log(`!!! ERRO NA FUNÇÃO GENERATEUPDATEREQUEST`);
        console.log(`==> ${formattedTimestamp} => ${error.message} // ${error.stack.replace(/\n/g, "   ||   ").replace(/\s\s\s\s/g, "")}`)
    }
}

module.exports = generateUpdateRequest;