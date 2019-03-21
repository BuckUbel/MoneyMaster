"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../helper/util");
const prop_types_1 = require("prop-types");
exports.bookingFields = {
    id: {
        fieldName: "ID",
        value: null,
        type: prop_types_1.number,
    },
    orderAccount: {
        fieldName: "Auftragskonto",
        value: "",
        type: prop_types_1.string,
    },
    bookingDate: {
        fieldName: "Buchungstag",
        value: null,
        type: Date,
    },
    validDate: {
        fieldName: "Valutadatum",
        value: null,
        type: Date,
    },
    bookingType: {
        fieldName: "Buchungstext",
        value: null,
        type: prop_types_1.string,
    },
    purpose: {
        fieldName: "Verwendungszweck",
        value: "",
        type: prop_types_1.string,
    },
    believerId: {
        fieldName: "Glaeubiger ID",
        value: "",
        type: prop_types_1.string,
    },
    mandateReference: {
        fieldName: "Mandatsreferenz",
        value: "",
        type: prop_types_1.string,
    },
    customerReference: {
        fieldName: "Kundenreferenz (End-to-End)",
        value: "",
        type: prop_types_1.string,
    },
    payPartner: {
        fieldName: "Beguenstigter/Zahlungspflichtiger",
        value: "",
        type: prop_types_1.string,
    },
    iban: {
        fieldName: "Kontonummer/IBAN",
        value: "",
        type: prop_types_1.string,
    },
    bic: {
        fieldName: "BIC (SWIFT-Code)",
        value: "",
        type: prop_types_1.string,
    },
    value: {
        fieldName: "Betrag",
        value: null,
        type: prop_types_1.number,
    },
    currency: {
        fieldName: "Waehrung",
        value: "",
        type: prop_types_1.string,
    },
    info: {
        fieldName: "Info",
        value: "",
        type: prop_types_1.string,
    },
};
function arrayToBookingModel(arr, categories) {
    const newElement = new BookingModel();
    Object.keys(exports.bookingFields).map((fieldName, index) => {
        const categoryIndex = categories.indexOf(exports.bookingFields[fieldName].fieldName);
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
        if (this.orderAccount === object.orderAccount) {
            if (this.bookingType === object.bookingType) {
                if (this.purpose === object.purpose) {
                    if (this.believerId === object.believerId) {
                        if (this.mandateReference === object.mandateReference) {
                            if (this.customerReference === object.customerReference) {
                                if (this.payPartner === object.payPartner) {
                                    if (this.iban === object.iban) {
                                        if (this.bic === object.bic) {
                                            if (Number(this.value) === Number(object.value)) {
                                                if (this.currency === object.currency) {
                                                    if (this.info === object.info) {
                                                        if (compareDateData(this.bookingDate, object.bookingDate)) {
                                                            // if (this.bookingDate.getTime() === object.bookingDate.getTime()) {
                                                            // Hinweis auf neue Buchung, andere sind veraltet
                                                            if (compareDateData(this.validDate, object.validDate)) {
                                                                // if (this.validDate.getTime() === object.validDate.getTime()) {
                                                                return "ignore";
                                                                // }
                                                            }
                                                            return "update";
                                                        }
                                                        // }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return "add";
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
