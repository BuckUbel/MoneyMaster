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
const CategoryModel_1 = require("../../../base/model/CategoryModel");
class Category {
    constructor(object) {
        this.id = object.id;
        this.name = object.name;
        this.description = object.description;
        this.color = object.color;
        this.isStandard = Number(object.isStandard);
    }
}
exports.Category = Category;
function loadAllCategoriesFromDB(db, limit) {
    return __awaiter(this, void 0, void 0, function* () {
        const rowNamesArray = Object.keys(CategoryModel_1.categoryFields).map((key) => {
            return "" + CategoryModel_1.categoryFields[key].fieldName + " as " + key;
        });
        const rowNames = rowNamesArray.join(", ");
        let queryString = ("SELECT " + rowNames + " " +
            "FROM " + db.config.tableNames.categories + " m ");
        if (limit) {
            queryString += "LIMIT " + limit + " ";
        }
        return yield db.sqlQuery(queryString);
    });
}
exports.loadAllCategoriesFromDB = loadAllCategoriesFromDB;
function insertACategory(db, accounts) {
    return __awaiter(this, void 0, void 0, function* () {
        const rowNamesArray = Object.keys(CategoryModel_1.categoryFields).reduce((filtered, key) => {
            if (key !== "id") {
                filtered.push(CategoryModel_1.categoryFields[key].fieldName);
            }
            return filtered;
        }, []);
        const rowNames = rowNamesArray.join(", ");
        const bookingStringArray = accounts.map((account) => {
            const newBooking = new Category(account);
            const valueArray = Object.keys(newBooking).reduce((filtered, key) => {
                if (key !== "id") {
                    filtered.push(newBooking[key]);
                }
                return filtered;
            }, []);
            return "('" + valueArray.join("', '") + "')";
        });
        const values = bookingStringArray.join(", ");
        const queryString = ("INSERT INTO " + db.config.tableNames.categories + " (" + rowNames + ") VALUES " + values + "");
        return yield db.sqlQuery(queryString);
    });
}
exports.insertACategory = insertACategory;
