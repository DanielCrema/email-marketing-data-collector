const validateAndUpdateCounter = require('./validateAndUpdateCounter');

async function validateCellContent(data, row, logColumn, totalEventCountColumn) {
  try {
    let eventCounter;
    let totalCounter;
    const eventCellContent = data[row - 1][logColumn - 1];
    const totalCountCellContent = data[row - 1][totalEventCountColumn - 1];

    
    if (eventCellContent === null || eventCellContent === undefined || eventCellContent === "") {
      eventCounter = 1;
    } else {
      eventCounter = validateAndUpdateCounter(eventCellContent);
    }

    if (totalCountCellContent === null || totalCountCellContent === undefined || totalCountCellContent === "") {
      totalCounter = 1;
    } else {
      totalCounter = validateAndUpdateCounter(totalCountCellContent);
    }

    return { eventCounter, totalCounter }
  } catch (error) {
    throw error
  }
}

module.exports = validateCellContent;