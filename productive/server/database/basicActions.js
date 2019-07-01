"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = require("../../base/helper/Entity");
function loadAllEntitiesFromDB(db, tableName, fields, limit) {
    return __awaiter(this, void 0, void 0, function* () {
        const rowNamesArray = Object.keys(fields).map((key) => {
            return "" + fields[key].fieldName + " as " + key;
        });
        const rowNames = rowNamesArray.join(", ");
        let queryString = ("SELECT " + rowNames + " " +
            "FROM " + tableName + " m ");
        if (limit) {
            queryString += "LIMIT " + limit + " ";
        }
        return yield db.sqlQuery(queryString);
    });
}
exports.loadAllEntitiesFromDB = loadAllEntitiesFromDB;
function loadOneEntityFromDB(db, tableName, fields, id, limit) {
    return __awaiter(this, void 0, void 0, function* () {
        const rowNamesArray = Object.keys(fields).map((key) => {
            return "" + fields[key].fieldName + " as " + key;
        });
        const rowNames = rowNamesArray.join(", ");
        let queryString = ("SELECT " + rowNames + " " +
            "FROM " + tableName + " m " +
            "WHERE m.id=" + id + " ");
        if (limit) {
            queryString += "LIMIT " + limit + " ";
        }
        return yield db.sqlQuery(queryString);
    });
}
exports.loadOneEntityFromDB = loadOneEntityFromDB;
function insertEntities(db, tableName, fields, entities) {
    return __awaiter(this, void 0, void 0, function* () {
        const rowNamesArray = Object.keys(fields).reduce((filtered, key) => {
            if (key !== "id") {
                filtered.push(fields[key].fieldName);
            }
            return filtered;
        }, []);
        const rowNames = rowNamesArray.join(", ");
        const entityStringArray = entities.map((entity) => {
            const databaseEntity = Entity_1.createEntityForDB(entity);
            const valueArray = [];
            Object.keys(fields).forEach((key, index) => {
                const currentField = fields[key];
                if (key !== "id") {
                    if (databaseEntity[key] === null) {
                        valueArray.push(String(databaseEntity[key]));
                    }
                    else {
                        if (currentField.type === "number" || currentField.type === "boolean") {
                            valueArray.push(databaseEntity[key]);
                        }
                        else {
                            valueArray.push("'" + databaseEntity[key] + "'");
                        }
                    }
                }
            });
            return "(" + valueArray.join(", ") + ")";
        });
        const values = entityStringArray.join(", ");
        const queryString = ("INSERT INTO " + tableName + " (" + rowNames + ") VALUES " + values + "");
        return yield db.sqlQuery(queryString);
    });
}
exports.insertEntities = insertEntities;
function updateEntities(db, tableName, fields, entities) {
    return __awaiter(this, void 0, void 0, function* () {
        const rowNamesArray = Object.keys(fields).reduce((filtered, key) => {
            if (key !== "id") {
                filtered.push(fields[key].fieldName);
            }
            return filtered;
        }, []);
        const queries = entities.map((entity) => {
            const databaseEntity = Entity_1.createEntityForDB(entity);
            const valueArray = [];
            Object.keys(fields).forEach((key, index) => {
                const currentField = fields[key];
                if (key !== "id") {
                    if (databaseEntity[key] === null) {
                        valueArray.push(String(databaseEntity[key]));
                    }
                    else {
                        if (currentField.type === "number" || currentField.type === "boolean") {
                            valueArray.push(databaseEntity[key]);
                        }
                        else {
                            valueArray.push("'" + databaseEntity[key] + "'");
                        }
                    }
                }
            });
            const arrayToSet = rowNamesArray.map((rowName, index) => {
                return rowName + "=" + valueArray[index] + "";
            });
            const arrayToSetString = arrayToSet.join(", ");
            return "UPDATE " + tableName + " SET " + arrayToSetString + " WHERE " + "id" + "='" + entity.id + "'";
        });
        queries.unshift("SET foreign_key_checks = 0");
        return db.sqlQuery(queries.join(";"));
    });
}
exports.updateEntities = updateEntities;
function deleteEntities(db, tableName, ids) {
    return __awaiter(this, void 0, void 0, function* () {
        const queries = ids.map((id) => {
            return "DELETE FROM  " + tableName + " WHERE " + "id" + "='" + id + "'";
        });
        return db.sqlQuery(queries.join(";"));
    });
}
exports.deleteEntities = deleteEntities;
