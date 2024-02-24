const { eachDayOfInterval, format , parse } = require('date-fns');

const allDaysBetweenIntervals = (checkIn,checkOut) => {
    const startDate = parse(checkIn, 'dd/MM/yyyy', new Date());
    const endDate = parse(checkOut, 'dd/MM/yyyy', new Date());
    let allDates = eachDayOfInterval({ start: startDate, end: endDate });
    return allDates.map(date => format(date, 'dd/MM/yyyy'));
}

module.exports = allDaysBetweenIntervals;