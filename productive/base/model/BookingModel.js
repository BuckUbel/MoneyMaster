"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../helper/util");
const prop_types_1 = require("prop-types");
exports.bookingFields = {
    id: {
        fieldName: "id",
        labelName: "ID",
        csvLabelName: "ID",
        value: null,
        type: prop_types_1.number,
    },
    orderAccount: {
        fieldName: "orderAccount",
        labelName: "Auftragskonto",
        csvLabelName: "Auftragskonto",
        value: "",
        type: prop_types_1.string,
    },
    bookingDate: {
        labelName: "Buchungstag",
        csvLabelName: "Buchungstag",
        fieldName: "bookingDate",
        value: null,
        type: Date,
    },
    validDate: {
        labelName: "Valutadatum",
        csvLabelName: "Valutadatum",
        fieldName: "validDate",
        value: null,
        type: Date,
    },
    bookingType: {
        labelName: "Buchungstext",
        csvLabelName: "Buchungstext",
        fieldName: "bookingType",
        value: null,
        type: prop_types_1.string,
    },
    purpose: {
        labelName: "Verwendungszweck",
        csvLabelName: "Verwendungszweck",
        fieldName: "purpose",
        value: "",
        type: prop_types_1.string,
    },
    believerId: {
        labelName: "Glaeubiger ID",
        csvLabelName: "Glaeubiger ID",
        fieldName: "believerId",
        value: "",
        type: prop_types_1.string,
    },
    mandateReference: {
        labelName: "Mandatsreferenz",
        csvLabelName: "Mandatsreferenz",
        fieldName: "mandateReference",
        value: "",
        type: prop_types_1.string,
    },
    customerReference: {
        labelName: "Kundenreferenz (End-to-End)",
        csvLabelName: "Kundenreferenz (End-to-End)",
        fieldName: "customerReference",
        value: "",
        type: prop_types_1.string,
    },
    payPartner: {
        labelName: "Beguenstigter/Zahlungspflichtiger",
        csvLabelName: "Beguenstigter/Zahlungspflichtiger",
        fieldName: "payPartner",
        value: "",
        type: prop_types_1.string,
    },
    iban: {
        labelName: "Kontonummer/IBAN",
        csvLabelName: "Kontonummer/IBAN",
        fieldName: "iban",
        value: "",
        type: prop_types_1.string,
    },
    bic: {
        labelName: "BIC (SWIFT-Code)",
        csvLabelName: "BIC (SWIFT-Code)",
        fieldName: "bic",
        value: "",
        type: prop_types_1.string,
    },
    value: {
        labelName: "Betrag",
        csvLabelName: "Betrag",
        fieldName: "value",
        value: null,
        type: prop_types_1.number,
    },
    currency: {
        labelName: "Waehrung",
        csvLabelName: "Waehrung",
        fieldName: "currency",
        value: "",
        type: prop_types_1.string,
    },
    info: {
        labelName: "Info",
        csvLabelName: "Info",
        fieldName: "info",
        value: "",
        type: prop_types_1.string,
    },
};
function arrayToBookingModel(arr, categories) {
    const newElement = new BookingModel();
    Object.keys(exports.bookingFields).map((fieldName, index) => {
        const categoryIndex = categories.indexOf(exports.bookingFields[fieldName].csvLabelName);
        const typeOfField = exports.bookingFields[fieldName].type;
        if (typeOfField === prop_types_1.string) {
            newElement[fieldName] = arr[categoryIndex] ? arr[categoryIndex].trim() : "";
        }
        if (typeOfField === Date) {
            newElement[fieldName] = null;
            if (arr[categoryIndex]) {
                const withTwenty = util_1.addTwentyToYear(arr[categoryIndex], ".");
                newElement[fieldName] = util_1.stringToDateWithSeparator(withTwenty, ".");
            }
        }
        if (typeOfField === prop_types_1.number) {
            newElement[fieldName] = null;
            if (arr[categoryIndex]) {
                newElement[fieldName] = Number(arr[categoryIndex].replace(",", "."));
            }
        }
    });
    return newElement;
}
exports.arrayToBookingModel = arrayToBookingModel;
class BookingModel {
    constructor() {
        this.id = 0;
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
        this.value = object && object.value ? parseFloat(object.value.replace(",", ".")) : exports.bookingFields.value.value;
        this.currency = object && object.currency ? object.currency : exports.bookingFields.currency.value;
        this.info = object && object.info ? object.info : exports.bookingFields.info.value;
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
