"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../helper/util");
const Entity_1 = require("../helper/Entity");
const Entity_2 = require("../actions/Entity");
exports.bookingActions = Entity_2.createEntityActions("booking");
exports.bookingFields = {
    id: {
        fieldName: "id",
        labelName: "ID",
        csvLabelName: "ID",
        value: null,
        type: "number",
    },
    orderAccount: {
        fieldName: "orderAccount",
        labelName: "Auftragskonto",
        csvLabelName: "Auftragskonto",
        value: "",
        type: "string",
    },
    bookingDate: {
        labelName: "Buchungstag",
        csvLabelName: "Buchungstag",
        fieldName: "bookingDate",
        value: null,
        type: "date",
    },
    validDate: {
        labelName: "Valutadatum",
        csvLabelName: "Valutadatum",
        fieldName: "validDate",
        value: null,
        type: "date",
    },
    bookingType: {
        labelName: "Buchungstext",
        csvLabelName: "Buchungstext",
        fieldName: "bookingType",
        value: null,
        type: "string",
    },
    purpose: {
        labelName: "Verwendungszweck",
        csvLabelName: "Verwendungszweck",
        fieldName: "purpose",
        value: "",
        type: "string",
    },
    believerId: {
        labelName: "Glaeubiger ID",
        csvLabelName: "Glaeubiger ID",
        fieldName: "believerId",
        value: "",
        type: "string",
    },
    mandateReference: {
        labelName: "Mandatsreferenz",
        csvLabelName: "Mandatsreferenz",
        fieldName: "mandateReference",
        value: "",
        type: "string",
    },
    customerReference: {
        labelName: "Kundenreferenz (End-to-End)",
        csvLabelName: "Kundenreferenz (End-to-End)",
        fieldName: "customerReference",
        value: "",
        type: "string",
    },
    payPartner: {
        labelName: "Beguenstigter/Zahlungspflichtiger",
        csvLabelName: "Beguenstigter/Zahlungspflichtiger",
        fieldName: "payPartner",
        value: "",
        type: "string",
    },
    iban: {
        labelName: "Kontonummer/IBAN",
        csvLabelName: "Kontonummer/IBAN",
        fieldName: "iban",
        value: "",
        type: "string",
    },
    bic: {
        labelName: "BIC (SWIFT-Code)",
        csvLabelName: "BIC (SWIFT-Code)",
        fieldName: "bic",
        value: "",
        type: "string",
    },
    value: {
        labelName: "Betrag",
        csvLabelName: "Betrag",
        fieldName: "value",
        value: null,
        type: "number",
    },
    currency: {
        labelName: "Waehrung",
        csvLabelName: "Waehrung",
        fieldName: "currency",
        value: "",
        type: "string",
    },
    info: {
        labelName: "Info",
        csvLabelName: "Info",
        fieldName: "info",
        value: "",
        type: "string",
    },
};
function arrayToBookingModel(arr, categories) {
    const newElement = new BookingModel();
    Object.keys(exports.bookingFields).map((fieldName, index) => {
        const categoryIndex = categories.indexOf(exports.bookingFields[fieldName].csvLabelName);
        const typeOfField = exports.bookingFields[fieldName].type;
        if (typeOfField === "string") {
            newElement[fieldName] = arr[categoryIndex] ? arr[categoryIndex].trim() : "";
        }
        if (typeOfField === "date") {
            newElement[fieldName] = null;
            if (arr[categoryIndex]) {
                const withTwenty = util_1.addTwentyToYear(arr[categoryIndex], ".");
                newElement[fieldName] = util_1.stringToDateWithSeparator(withTwenty, ".");
            }
        }
        if (typeOfField === "number") {
            newElement[fieldName] = null;
            if (arr[categoryIndex]) {
                newElement[fieldName] = Number(arr[categoryIndex].replace(",", "."));
            }
        }
    });
    return newElement;
}
exports.arrayToBookingModel = arrayToBookingModel;
class BookingModel extends Entity_1.Entity {
    static createEntity(object) {
        const entity = new BookingModel();
        entity.set(object);
        return entity;
    }
    static createEmptyEntity() {
        return new BookingModel({
            id: exports.bookingFields.id.value,
            orderAccount: exports.bookingFields.orderAccount.value,
            bookingDate: exports.bookingFields.bookingDate.value,
            validDate: exports.bookingFields.validDate.value,
            bookingType: exports.bookingFields.bookingType.value,
            purpose: exports.bookingFields.purpose.value,
            believerId: exports.bookingFields.believerId.value,
            mandateReference: exports.bookingFields.mandateReference.value,
            customerReference: exports.bookingFields.customerReference.value,
            payPartner: exports.bookingFields.payPartner.value,
            iban: exports.bookingFields.iban.value,
            bic: exports.bookingFields.bic.value,
            value: exports.bookingFields.value.value,
            currency: exports.bookingFields.currency.value,
            info: exports.bookingFields.info.value,
        });
    }
    static getLastDate(bookings) {
        return BookingModel.getHighestDate(bookings, true);
    }
    static getFirstDate(bookings) {
        return BookingModel.getHighestDate(bookings, false);
    }
    static getHighestDate(bookings, max) {
        const dates = bookings.map((booking) => {
            const startDate = booking.bookingDate;
            return startDate !== null ? startDate.getTime() : 0;
        });
        if (max) {
            return new Date(Math.max(...dates));
        }
        return new Date(Math.min(...dates));
    }
    constructor(obj) {
        super();
        if (obj) {
            this.id = obj.id;
            this.orderAccount = obj.orderAccount;
            this.bookingDate = obj.bookingDate;
            this.validDate = obj.validDate;
            this.bookingType = obj.bookingType;
            this.purpose = obj.purpose;
            this.believerId = obj.believerId;
            this.mandateReference = obj.mandateReference;
            this.customerReference = obj.customerReference;
            this.payPartner = obj.payPartner;
            this.iban = obj.iban;
            this.bic = obj.bic;
            this.value = obj.value;
            this.currency = obj.currency;
            this.info = obj.info;
        }
    }
    set(object) {
        this.id = object && object.id ? Number(object.id) : exports.bookingFields.id.value;
        this.orderAccount = object && object.orderAccount ? object.orderAccount : exports.bookingFields.orderAccount.value;
        this.orderAccount = object && object.orderAccount ? object.orderAccount : exports.bookingFields.orderAccount.value;
        this.bookingDate = exports.bookingFields.bookingDate.value;
        if (object && object.bookingDate) {
            this.bookingDate = util_1.stringToDate(object.bookingDate);
        }
        this.validDate = object && object.validDate ? util_1.stringToDate(object.validDate) : exports.bookingFields.validDate.value;
        this.bookingType = object && object.bookingType ? object.bookingType : exports.bookingFields.bookingType.value;
        this.purpose = object && object.purpose ? object.purpose : exports.bookingFields.purpose.value;
        this.believerId = object && object.believerId ? object.believerId : exports.bookingFields.believerId.value;
        this.mandateReference = exports.bookingFields.mandateReference.value;
        if (object && object.mandateReference) {
            this.mandateReference = object.mandateReference;
        }
        this.customerReference = exports.bookingFields.customerReference.value;
        if (object && object.customerReference) {
            this.customerReference = object.customerReference;
        }
        this.payPartner = object && object.payPartner ? object.payPartner : exports.bookingFields.payPartner.value;
        this.iban = object && object.iban ? object.iban : exports.bookingFields.iban.value;
        this.bic = object && object.bic ? object.bic : exports.bookingFields.bic.value;
        this.value = exports.bookingFields.value.value;
        if (object && object.value) {
            this.value = Number(Number(object.value.replace(",", ".")).toFixed(2));
        }
        this.currency = object && object.currency ? object.currency : exports.bookingFields.currency.value;
        this.info = object && object.info ? object.info : exports.bookingFields.info.value;
    }
    getDBObject() {
        return {
            id: this.id,
            orderAccount: this.orderAccount,
            bookingDate: util_1.dateTo_YMDHMS_String(new Date(this.bookingDate)),
            validDate: util_1.dateTo_YMDHMS_String(new Date(this.validDate)),
            bookingType: this.bookingType,
            purpose: this.purpose,
            believerId: this.believerId,
            mandateReference: this.mandateReference,
            customerReference: this.customerReference,
            payPartner: this.payPartner,
            iban: this.iban,
            bic: this.bic,
            value: this.value,
            currency: this.currency,
            info: this.info
        };
    }
    equals(object) {
        if (this.info === "Umsatz vorgemerkt") {
            return "ignore";
        }
        const hasSimpleSameData = (this.orderAccount === object.orderAccount)
            && (this.bookingType === object.bookingType)
            && (this.purpose === object.purpose)
            && (this.believerId === object.believerId)
            && (this.mandateReference === object.mandateReference)
            && (this.customerReference === object.customerReference)
            && (this.payPartner === object.payPartner)
            && (this.iban === object.iban)
            && (this.bic === object.bic)
            && (Number(this.value) === Number(object.value))
            && (this.currency === object.currency)
            && (this.info === object.info);
        if (hasSimpleSameData) {
            if (compareDateData(this.bookingDate, object.bookingDate)) {
                if (compareDateData(this.validDate, object.validDate)) {
                    return "ignore"; // Beide Buchungen sind komplett gleich
                }
                return "update"; // Hinweis auf neue Buchung, andere sind veraltet
            }
        }
        return "add"; // Diese Buchung ist noch nicht vorhanden
    }
}
exports.BookingModel = BookingModel;
function compareDateData(d1, d2) {
    if (d1 && d2) {
        if (d1.getTime() === d2.getTime()) {
            return true;
        }
    }
    if (!d1 && !d2) {
        return true;
    }
    return false;
}
exports.compareDateData = compareDateData;
