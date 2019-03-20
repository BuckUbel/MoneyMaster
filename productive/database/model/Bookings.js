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
const prop_types_1 = require("prop-types");
function dateTo_YMDHMS_String(d) {
    return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
}
exports.dateTo_YMDHMS_String = dateTo_YMDHMS_String;
class Booking {
    constructor(object) {
        this.id = object.id;
        this.orderAccount = object.orderAccount;
        this.bookingDate = dateTo_YMDHMS_String(new Date(object.bookingDate));
        this.validDate = dateTo_YMDHMS_String(new Date(object.validDate));
        this.bookingType = object.bookingType;
        this.purpose = object.purpose;
        this.believerId = object.believerId;
        this.mandateReference = object.mandateReference;
        this.customerReference = object.customerReference;
        this.payPartner = object.payPartner;
        this.iban = object.iban;
        this.bic = object.bic;
        this.value = object.value;
        this.currency = object.currency;
        this.info = object.info;
    }
}
exports.Booking = Booking;
exports.bookingFields = {
    id: {
        fieldName: "id",
        value: null,
        type: prop_types_1.number,
    },
    orderAccount: {
        fieldName: "orderAccount",
        value: "",
        type: prop_types_1.string,
    },
    bookingDate: {
        fieldName: "bookingDate",
        value: null,
        type: Date,
    },
    validDate: {
        fieldName: "validDate",
        value: null,
        type: Date,
    },
    bookingType: {
        fieldName: "bookingType",
        value: "",
        type: prop_types_1.string,
    },
    purpose: {
        fieldName: "purpose",
        value: "",
        type: prop_types_1.string,
    },
    believerId: {
        fieldName: "believerId",
        value: "",
        type: prop_types_1.string,
    },
    mandateReference: {
        fieldName: "mandateReference",
        value: "",
        type: prop_types_1.string,
    },
    customerReference: {
        fieldName: "customerReference",
        value: "",
        type: prop_types_1.string,
    },
    payPartner: {
        fieldName: "payPartner",
        value: "",
        type: prop_types_1.string,
    },
    iban: {
        fieldName: "iban",
        value: "",
        type: prop_types_1.string,
    },
    bic: {
        fieldName: "bic",
        value: "",
        type: prop_types_1.string,
    },
    value: {
        fieldName: "value",
        value: "",
        type: prop_types_1.string,
    },
    currency: {
        fieldName: "currency",
        value: "",
        type: prop_types_1.string,
    },
    info: {
        fieldName: "info",
        value: "",
        type: prop_types_1.string,
    },
};
const tableName = "bookings";
function loadAllBookingsFromDB(db, limit) {
    return __awaiter(this, void 0, void 0, function* () {
        const rowNamesArray = Object.keys(exports.bookingFields).map((key) => {
            return exports.bookingFields[key].fieldName + " as " + key;
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
exports.loadAllBookingsFromDB = loadAllBookingsFromDB;
function insertABooking(db, bookings) {
    return __awaiter(this, void 0, void 0, function* () {
        const rowNamesArray = Object.keys(exports.bookingFields).reduce((filtered, key) => {
            if (key !== "id") {
                filtered.push(exports.bookingFields[key].fieldName);
            }
            return filtered;
        }, []);
        const rowNames = rowNamesArray.join(", ");
        const bookingStringArray = bookings.map((booking) => {
            const newBooking = new Booking(booking);
            const valueArray = Object.keys(newBooking).reduce((filtered, key) => {
                if (key !== "id") {
                    filtered.push(newBooking[key]);
                }
                return filtered;
            }, []);
            return "('" + valueArray.join("', '") + "')";
        });
        const values = bookingStringArray.join(", ");
        const queryString = ("INSERT INTO " + tableName + " (" + rowNames + ") VALUES " + values + "");
        return yield db.sqlQuery(queryString);
    });
}
exports.insertABooking = insertABooking;
function updateABooking(db, booking) {
    return __awaiter(this, void 0, void 0, function* () {
        const rowNamesArray = Object.keys(exports.bookingFields).map((key) => {
            return exports.bookingFields[key].fieldName + " as " + key;
        });
        const valueArray = Object.keys(booking).map((key) => booking[key]);
        const rowNames = rowNamesArray.join(", ");
        const values = "'" + valueArray.join("', '") + "'";
        const queryString = ("INSERT INTO " + tableName + " (" + rowNames + ") VALUES (" + values + ")");
        return db.sqlQuery("").then((rows) => {
            return rows;
        }).catch((error) => {
            return error;
        });
    });
}
exports.updateABooking = updateABooking;
