"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function beautyDateString(date) {
    return basicDateToString(date, ".");
}
exports.beautyDateString = beautyDateString;
function beautyDateTimeString(date) {
    return beautyDateString(date) + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}
exports.beautyDateTimeString = beautyDateTimeString;
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
