async function timeoutCheck(data, row, column, year, month, day, hours, minutes) {
  try {
    let validatedTimeout = false;
    const nowYear = parseInt(year);
    const nowMonth = parseInt(month);
    const nowDay = parseInt(day);
    const nowHours = parseInt(hours);
    const nowMinutes = parseInt(minutes);
    const cellContent = data[row - 1][column - 1];
    if (cellContent === null || cellContent === undefined || cellContent === "") {
      validatedTimeout = true;
    } else {
      // Compare the year
      let yearPast = false;
      let regex = /-\d\d\d\d/
      let firstMatch = cellContent.match(regex);
      let filterRegex = /\d\d\d\d/
      const yearMatch = firstMatch[0].match(filterRegex);
      const lastLogYear = parseInt(yearMatch);
      if (nowYear >= lastLogYear + 2) {
        validatedTimeout = true
        return validatedTimeout
      } else if (nowYear > lastLogYear) {
        yearPast = true;
      }

      // Compare the month
      let monthPast = false;
      regex = /-\d\d-/
      firstMatch = cellContent.match(regex);
      filterRegex = /\d\d/
      const monthMatch = firstMatch[0].match(filterRegex);
      const lastLogMonth = parseInt(monthMatch);
      if (nowMonth >= lastLogMonth + 2 || yearPast && nowMonth >= 2) {
        validatedTimeout = true
        return validatedTimeout
      } else if (nowMonth > lastLogMonth || yearPast && nowMonth == 1) {
        monthPast = true;
      }

      // Compare the day
      let dayPast = false;
      regex = /: \d\d/
      firstMatch = cellContent.match(regex);
      filterRegex = /\d\d/
      const dayMatch = firstMatch[0].match(filterRegex);
      const lastLogDay = parseInt(dayMatch);
      if (nowDay >= lastLogDay + 2 || monthPast && nowDay >= 2) {
        validatedTimeout = true
        return validatedTimeout
      } else if (nowDay > lastLogDay || monthPast && nowDay == 1) {
        dayPast = true;
      }

      // Compare the Hours
      let hourPast = false;
      regex = / \d\d:/
      firstMatch = cellContent.match(regex);
      filterRegex = /\d\d/
      const hoursMatch = firstMatch[0].match(filterRegex);
      const lastLogHours = parseInt(hoursMatch);
      if (nowHours >= lastLogHours + 2 || dayPast && nowHours >= 1) {
        validatedTimeout = true
        return validatedTimeout
      } else if (nowHours > lastLogHours || dayPast && nowHours == 0) {
        hourPast = true;
      }

      // Compare the minutes
      regex = /:\d\dh/
      firstMatch = cellContent.match(regex);
      filterRegex = /\d\d/
      const minutesMatch = firstMatch[0].match(filterRegex);
      const lastLogMinutes = parseInt(minutesMatch);
      if (nowMinutes >= lastLogMinutes + 10) { // General case: 10 minutes or more passed
        validatedTimeout = true
        return validatedTimeout
      }

      if (hourPast) {
        // Handle rollover from 50 to 09
        // Includes the possibility of 1 minute passing within the execution runtime of the script
        if (nowMinutes >= 10 || lastLogMinutes < 50 ||
          lastLogMinutes === 50 && nowMinutes >= 0 || // 50 to 00
          lastLogMinutes === 51 && nowMinutes >= 1 || // 51 to 01
          lastLogMinutes === 52 && nowMinutes >= 2 || // 52 to 02
          lastLogMinutes === 53 && nowMinutes >= 3 || // 53 to 03
          lastLogMinutes === 54 && nowMinutes >= 4 || // 54 to 04
          lastLogMinutes === 55 && nowMinutes >= 5 || // 55 to 05
          lastLogMinutes === 56 && nowMinutes >= 6 || // 56 to 06
          lastLogMinutes === 57 && nowMinutes >= 7 || // 57 to 07
          lastLogMinutes === 58 && nowMinutes >= 8 || // 58 to 08
          lastLogMinutes === 59 && nowMinutes >= 9) // 59 to 09
        {
          validatedTimeout = true
        }
      }
    }
    return validatedTimeout
  } catch (error) {
    throw error
  }
}

module.exports = timeoutCheck;