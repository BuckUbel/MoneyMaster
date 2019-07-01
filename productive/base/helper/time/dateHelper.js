"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MonthList_1 = require("./MonthList");
function dateToDayString(date) {
    return basicDateToString(date, "-");
}
exports.dateToDayString = dateToDayString;
function beautyDateString(date) {
    return basicDateToString(date, ".");
}
exports.beautyDateString = beautyDateString;
function basicDateToString(date, delimiter) {
    let month = "" + (date.getMonth() + 1);
    let day = "" + date.getDate();
    const year = date.getFullYear();
    if (month.length < 2) {
        month = "0" + month;
    }
    if (day.length < 2) {
        day = "0" + day;
    }
    return [day, month, year].join(delimiter);
}
exports.basicDateToString = basicDateToString;
function dateToYMDString(date, delimiter) {
    let month = "" + (date.getMonth() + 1);
    let day = "" + date.getDate();
    const year = date.getFullYear();
    if (month.length < 2) {
        month = "0" + month;
    }
    if (day.length < 2) {
        day = "0" + day;
    }
    return [year, month, day].join(delimiter);
}
exports.dateToYMDString = dateToYMDString;
function stringToDate(s) {
    return Date.parse(s) ? new Date(Date.parse(s)) : null;
}
exports.stringToDate = stringToDate;
function basicStringDMYToDate(s, seperator) {
    const stringArray = s.split(seperator);
    const day = stringArray[0];
    const month = stringArray[1];
    const year = stringArray[2];
    return stringToDate(year + "-" + month + "-" + day);
}
exports.basicStringDMYToDate = basicStringDMYToDate;
function dateToString(d) {
    return d == null ? "" : beautyDateString(d);
}
exports.dateToString = dateToString;
function daysDiff(d1, d2) {
    return ((d2.getTime() - d1.getTime()) / (1000 * 3600 * 24));
}
exports.daysDiff = daysDiff;
function getYearString(d1) {
    return String(d1.getFullYear());
}
exports.getYearString = getYearString;
// export function changeDateMonth(d: Date, a: number): Date {
//   return new Date(d.getFullYear(), d.getMonth() + a, 1);
// }
function changeDateYearFirstDay(d, a) {
    return new Date(d.getFullYear() + a, 0, 1);
}
exports.changeDateYearFirstDay = changeDateYearFirstDay;
function changeDateMonthVarDay(d, a, b) {
    if (b < 29) {
        return new Date(d.getFullYear(), d.getMonth() + a, b);
    }
    return new Date(d.getFullYear(), d.getMonth() + a + 1, 0);
}
exports.changeDateMonthVarDay = changeDateMonthVarDay;
function changeDateMonthFirstDay(d, a) {
    return new Date(d.getFullYear(), d.getMonth() + a, 1);
}
exports.changeDateMonthFirstDay = changeDateMonthFirstDay;
function changeDateMonthLastDay(d, a) {
    return new Date(d.getFullYear(), d.getMonth() + a + 1, 0);
}
exports.changeDateMonthLastDay = changeDateMonthLastDay;
function changeDateMonthMiddleDay(d, a) {
    return new Date(d.getFullYear(), d.getMonth() + a, 15);
}
exports.changeDateMonthMiddleDay = changeDateMonthMiddleDay;
function prevDay(d) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1);
}
exports.prevDay = prevDay;
function nextDay(d) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
}
exports.nextDay = nextDay;
function getEachDayBetweenDays(d1, d2) {
    const returnDates = [];
    for (let d3 = d1; d3.getTime() < d2.getTime(); d3 = nextDay(d3)) {
        returnDates.push(d3);
    }
    return returnDates;
}
exports.getEachDayBetweenDays = getEachDayBetweenDays;
function getFirstDayOfYearsBetweenDays(d1, d2) {
    const returnDates = [];
    for (let d3 = changeDateYearFirstDay(d1, 0); d3.getTime() < d2.getTime(); d3 = changeDateYearFirstDay(d3, 1)) {
        returnDates.push(d3);
    }
    return returnDates;
}
exports.getFirstDayOfYearsBetweenDays = getFirstDayOfYearsBetweenDays;
function getFirstDayOfMonthsBetweenDays(d1, d2) {
    const returnDates = [];
    for (let d3 = changeDateMonthFirstDay(d1, 0); d3.getTime() < d2.getTime(); d3 = changeDateMonthFirstDay(d3, 1)) {
        returnDates.push(d3);
    }
    return returnDates;
}
exports.getFirstDayOfMonthsBetweenDays = getFirstDayOfMonthsBetweenDays;
function getCountOfMonthsBetweenDates(d1, d2) {
    let monthCount = 0;
    const d3 = {
        month: d1.getMonth(),
        year: d1.getFullYear()
    };
    while (d3.month !== d2.getMonth() || d3.year !== d2.getFullYear()) {
        if (d3.month === 11) {
            d3.year++;
            d3.month = 0;
        }
        else {
            d3.month++;
        }
        monthCount++;
    }
    return monthCount;
}
exports.getCountOfMonthsBetweenDates = getCountOfMonthsBetweenDates;
function isDMYDateString(s) {
    return (s.match(/^\d\d\.\d\d.\d\d\d\d$/) !== null);
}
exports.isDMYDateString = isDMYDateString;
exports.monthList = new MonthList_1.MonthList();
