function validateAndUpdateCounter(log) {
    try {
        const regex = /\d+x/;
        const countsStatement = log.match(regex);
        const removeXRegex = /\d+/;
        let counter = countsStatement[0].match(removeXRegex);
        counter = parseInt(counter) + 1
        return counter
    } catch (error) {
        throw error
    }
}

module.exports = validateAndUpdateCounter;