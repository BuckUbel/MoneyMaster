"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prop_types_1 = require("prop-types");
function dateToDatabaseDateString(d, separator) {
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return year + separator + month + separator + day;
}
exports.dateToDatabaseDateString = dateToDatabaseDateString;
function stringToDateWithSeparator(s, separator) {
    const dateFields = s.split(separator);
    const day = dateFields[0];
    const month = dateFields[1];
    const year = dateFields[2];
    return new Date(year + "-" + month + "-" + day);
}
exports.stringToDateWithSeparator = stringToDateWithSeparator;
function addTwentyToYear(s, separator) {
    const dateFields = s.split(separator);
    const day = dateFields[0];
    const month = dateFields[1];
    const year = dateFields[2];
    return day + separator + month + separator + "20" + year;
}
exports.addTwentyToYear = addTwentyToYear;
exports.bookingFieldsWithLabel = {
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
    // const fields = Object.keys(bookingFields);
    const newElement = new BookingModel();
    Object.keys(exports.bookingFieldsWithLabel).map((fieldName, index) => {
        const categoryIndex = categories.indexOf(exports.bookingFieldsWithLabel[fieldName].fieldName);
        const typeOfField = exports.bookingFieldsWithLabel[fieldName].type;
        if (typeOfField === prop_types_1.string) {
            newElement[fieldName] = arr[categoryIndex] ? arr[categoryIndex].trim() : "";
        }
        if (typeOfField === Date) {
            newElement[fieldName] = arr[categoryIndex] ? stringToDateWithSeparator(addTwentyToYear(arr[categoryIndex], "."), ".") : null;
        }
        if (typeOfField === prop_types_1.number) {
            newElement[fieldName] = arr[categoryIndex] ? Number(arr[categoryIndex].replace(",", ".")) : null;
        }
    });
    return newElement;
}
exports.arrayToBookingModel = arrayToBookingModel;
function stringToDate(s) {
    return Date.parse(s) ? new Date(Date.parse(s)) : null;
}
exports.stringToDate = stringToDate;
class BookingModel {
    constructor() {
        this.id = 0;
    }
    get() {
        return {
            id: String(this.id),
            orderAccount: this.orderAccount,
            bookingDate: dateToDatabaseDateString(this.bookingDate, "-"),
            validDate: dateToDatabaseDateString(this.validDate, "-"),
            bookingType: this.bookingType,
            purpose: this.purpose,
            believerId: this.believerId,
            mandateReference: this.mandateReference,
            customerReference: this.customerReference,
            payPartner: this.payPartner,
            iban: this.iban,
            bic: this.bic,
            value: String(this.value),
            currency: this.currency,
            info: this.info
        };
    }
    set(object) {
        this.id = object && object.id ? Number(object.id) : exports.bookingFieldsWithLabel.id.value;
        this.orderAccount = object && object.orderAccount ? object.orderAccount : exports.bookingFieldsWithLabel.orderAccount.value;
        this.orderAccount = object && object.orderAccount ? object.orderAccount : exports.bookingFieldsWithLabel.orderAccount.value;
        this.bookingDate = object && object.bookingDate ? stringToDate(object.bookingDate) : exports.bookingFieldsWithLabel.bookingDate.value;
        this.validDate = object && object.validDate ? stringToDate(object.validDate) : exports.bookingFieldsWithLabel.validDate.value;
        this.bookingType = object && object.bookingType ? object.bookingType : exports.bookingFieldsWithLabel.bookingType.value;
        this.purpose = object && object.purpose ? object.purpose : exports.bookingFieldsWithLabel.purpose.value;
        this.believerId = object && object.believerId ? object.believerId : exports.bookingFieldsWithLabel.believerId.value;
        this.mandateReference = object && object.mandateReference ? object.mandateReference : exports.bookingFieldsWithLabel.mandateReference.value;
        this.customerReference = object && object.customerReference ? object.customerReference : exports.bookingFieldsWithLabel.customerReference.value;
        this.payPartner = object && object.payPartner ? object.payPartner : exports.bookingFieldsWithLabel.payPartner.value;
        this.iban = object && object.iban ? object.iban : exports.bookingFieldsWithLabel.iban.value;
        this.bic = object && object.bic ? object.bic : exports.bookingFieldsWithLabel.bic.value;
        this.value = object && object.value ? parseFloat(object.value.replace(",", ".")) : exports.bookingFieldsWithLabel.value.value;
        this.currency = object && object.currency ? object.currency : exports.bookingFieldsWithLabel.currency.value;
        this.info = object && object.info ? object.info : exports.bookingFieldsWithLabel.info.value;
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
