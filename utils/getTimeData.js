const moment = require('moment-timezone');

async function getTimeData() {
    try {
        const now = moment().tz('America/Sao_Paulo'); // Get the current time in the specified timezone

        const year = now.format('YYYY');
        const month = now.format('MM');
        const day = now.format('DD');
        const hours = now.format('HH');
        const minutes = now.format('mm');

        // Format the timestamp as DD-MM-YYYY / HH:MM h
        const formattedDate = `${day}-${month}-${year} / ${hours}:${minutes}h`;

        return { formattedDate, year, month, day, hours, minutes };
    } catch (error) {
        throw error
    }
}

module.exports = getTimeData;