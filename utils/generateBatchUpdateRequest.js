const moment = require('moment-timezone');

function generateBatchUpdateRequest(auth, spreadsheetId, updates) {
    try {
        const requests = updates.map(update => {
            const range = update.range || `Sheet1!${String.fromCharCode(65 + update.column)}${update.row}`;
            return {
                range,
                values: [[update.value]]
            };
        });

        return {
            auth,
            spreadsheetId,
            resource: {
                data: requests,
                valueInputOption: 'USER_ENTERED'
            }
        };
    } catch (error) {
        const now = moment().tz('America/Sao_Paulo');
        const formattedTimestamp = now.format('DD-MM-YYYY || HH:mm:ss.SSS');

        console.log(`!!! ERRO NA FUNÇÃO GENERATEBATCHUPDATEREQUEST`);
        console.log(`==> ${formattedTimestamp} => ${error.message} // ${error.stack.replace(/\n/g, "   ||   ").replace(/\s\s\s\s/g, "")}`);
    }
}

module.exports = generateBatchUpdateRequest;