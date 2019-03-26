"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dateHelper_1 = require("./time/dateHelper");
function dateToDayString(date) {
    return basicDateToString(date, "-");
}
exports.dateToDayString = dateToDayString;
function beautyDateString(date) {
    return date ? basicDateToString(date, ".") : "";
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
function addTwentyToYear(s, separator) {
    const dateFields = s.split(separator);
    const day = dateFields[0];
    const month = dateFields[1];
    const year = dateFields[2];
    return day + separator + month + separator + "20" + year;
}
exports.addTwentyToYear = addTwentyToYear;
function stringToDateWithSeparator(s, separator) {
    const dateFields = s.split(separator);
    const day = dateFields[0];
    const month = dateFields[1];
    const year = dateFields[2];
    return new Date(year + "-" + month + "-" + day);
}
exports.stringToDateWithSeparator = stringToDateWithSeparator;
function stringToDate(s) {
    return Date.parse(s) ? new Date(Date.parse(s)) : null;
}
exports.stringToDate = stringToDate;
function getStringValues(element, separator) {
    return element.split(separator).map((p) => {
        return p ? p.replace(/[\"]/gi, "") : "";
    });
}
exports.getStringValues = getStringValues;
function dateTo_YMDHMS_String(d) {
    return d.getFullYear() + "-" + (d.getMonth() + 1)
        + "-" + d.getDate() + " " + d.getHours() + ":"
        + d.getMinutes() + ":" + d.getSeconds();
}
exports.dateTo_YMDHMS_String = dateTo_YMDHMS_String;
exports.apiPath = "/api";
exports.standardApiCallPaths = {
    create: "/create",
    read: "/load",
    readOne: "/",
    update: "/update",
    delete: "/delete",
};
function createApiCallPathObject(entityString) {
    return {
        create: exports.apiPath + entityString + exports.standardApiCallPaths.create,
        read: exports.apiPath + entityString + exports.standardApiCallPaths.read,
        readOne: exports.apiPath + entityString + exports.standardApiCallPaths.readOne,
        update: exports.apiPath + entityString + exports.standardApiCallPaths.update,
        delete: exports.apiPath + entityString + exports.standardApiCallPaths.delete,
    };
}
exports.createApiCallPathObject = createApiCallPathObject;
function uniqueArray(value, index, self) {
    return self.indexOf(value) === index;
}
exports.uniqueArray = uniqueArray;
function defaultCompare(a, b) {
    const typeOfVar = typeof a;
    if (typeOfVar === "boolean") {
        return a === b ? 0 : a ? -1 : 1;
    }
    if (typeOfVar === "string") {
        const isDate = dateHelper_1.isDMYDateString(a);
        if (isDate) {
            const elementA = a ? dateHelper_1.basicStringDMYToDate(a, ".").getTime() : 0;
            const elementB = b ? dateHelper_1.basicStringDMYToDate(b, ".").getTime() : 0;
            return elementA - elementB;
        }
        else {
            return a.localeCompare(b);
        }
    }
    if (typeOfVar === "number") {
        return a - b;
    }
    if (typeOfVar === "object") {
        return 0;
    }
}
exports.defaultCompare = defaultCompare;
function getAllNumbersBetweenTwoNumbers(x, y) {
    const nums = [];
    for (let i = x; i <= y; i++) {
        nums.push(i);
    }
    return nums;
}
exports.getAllNumbersBetweenTwoNumbers = getAllNumbersBetweenTwoNumbers;
function getArrayFromObject(obj) {
    return Object.keys(obj).map((key) => obj[key]);
}
exports.getArrayFromObject = getArrayFromObject;
