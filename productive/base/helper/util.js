"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    readOne: "/{index*}",
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
function createEntityForDB(object) {
    return object.getDBObject();
}
exports.createEntityForDB = createEntityForDB;
class Entity {
    static createEntity(object) {
        const entity = new Entity();
        entity.set(object);
        return entity;
    }
    constructor() {
        this.id = 0;
    }
    set(object) {
        this.id = object.id ? Number(object.id) : null;
    }
    getDBObject() {
        return { id: this.id };
    }
}
exports.Entity = Entity;
