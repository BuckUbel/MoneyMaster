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
const ShortDescriptionModel_1 = require("../../../base/model/ShortDescriptionModel");
class ShortDescription {
    constructor(object) {
        this.id = object.id;
        this.originalContent = object.originalContent;
        this.replaceContent = object.replaceContent;
    }
}
exports.ShortDescription = ShortDescription;
function loadAllShortDescriptionsFromDB(db, limit) {
    return __awaiter(this, void 0, void 0, function* () {
        const rowNamesArray = Object.keys(ShortDescriptionModel_1.shortDescriptionFields).map((key) => {
            return "" + ShortDescriptionModel_1.shortDescriptionFields[key].fieldName + " as " + key;
        });
        const rowNames = rowNamesArray.join(", ");
        let queryString = ("SELECT " + rowNames + " " +
            "FROM " + db.config.tableNames.shortDescriptions + " m ");
        if (limit) {
            queryString += "LIMIT " + limit + " ";
        }
        return yield db.sqlQuery(queryString);
    });
}
exports.loadAllShortDescriptionsFromDB = loadAllShortDescriptionsFromDB;
function insertAShortDescription(db, accounts) {
    return __awaiter(this, void 0, void 0, function* () {
        const rowNamesArray = Object.keys(ShortDescriptionModel_1.shortDescriptionFields).reduce((filtered, key) => {
            if (key !== "id") {
                filtered.push(ShortDescriptionModel_1.shortDescriptionFields[key].fieldName);
            }
            return filtered;
        }, []);
        const rowNames = rowNamesArray.join(", ");
        const bookingStringArray = accounts.map((account) => {
            const newBooking = new ShortDescription(account);
            const valueArray = Object.keys(newBooking).reduce((filtered, key) => {
                if (key !== "id") {
                    filtered.push(newBooking[key]);
                }
                return filtered;
            }, []);
            return "('" + valueArray.join("', '") + "')";
        });
        const values = bookingStringArray.join(", ");
        const queryString = ("INSERT INTO " + db.config.tableNames.shortDescriptions + " (" + rowNames + ") VALUES " + values + "");
        return yield db.sqlQuery(queryString);
    });
}
exports.insertAShortDescription = insertAShortDescription;
