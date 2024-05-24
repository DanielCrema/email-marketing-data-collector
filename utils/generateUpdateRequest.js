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
        const now = new Date(Date.now());
        const hoursNow = now.getHours().toString().padStart(2, '0');
        const timestamp = new Date().toISOString();
        const formattedTimestamp = timestamp.replace(/T\d\d/, `T${hoursNow}`).replace("T", " T ");

        console.log(`!!! ERRO NA FUNÇÃO GENERATEUPDATEREQUEST`);
        console.log(`==> ${formattedTimestamp} => ${error.message} // ${error.stack.replace(/\n/g, "   ||   ").replace(/\s\s\s\s/g, "")}`)
    }
}

module.exports = generateUpdateRequest;