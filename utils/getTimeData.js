async function getTimeData() {
    try {
        const now = new Date(Date.now());

        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based, so add 1
        const day = now.getDate().toString().padStart(2, '0');
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');

        // Format the timestamp as DD-MM-YYYY / HH:MM h
        const formattedDate = `${day}-${month}-${year} / ${hours}:${minutes}h`;

        return { formattedDate, year, month, day, hours, minutes };
    } catch (error) {
        throw error
    }
}

module.exports = getTimeData;