import {
    addTwentyToYear,
    IDBCol,
    stringToDate,
    stringToDateWithSeparator
} from "../helper/util";
import {number, string} from "prop-types";

interface IBookingsFields {
    id?: IDBCol<number>;
    orderAccount?: IDBCol<string>;
    bookingDate?: IDBCol<Date>;
    validDate?: IDBCol<Date>;
    bookingType?: IDBCol<string>;
    purpose?: IDBCol<string>;
    believerId?: IDBCol<string>;
    mandateReference?: IDBCol<string>;
    customerReference?: IDBCol<string>;
    payPartner?: IDBCol<string>;
    iban?: IDBCol<string>;
    bic?: IDBCol<string>;
    value?: IDBCol<number>;
    currency?: IDBCol<string>;
    info?: IDBCol<string>;

    [key: string]: any;
}

export const bookingFields: IBookingsFields = {
    id: {
        fieldName: "id",
        labelName: "ID",
        csvLabelName: "ID",
        value: null,
        type: number,
    },
    orderAccount: {
        fieldName: "orderAccount",
        labelName: "Auftragskonto",
        csvLabelName: "Auftragskonto",
        value: "",
        type: string,
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
        type: string,
    },
    purpose: {
        labelName: "Verwendungszweck",
        csvLabelName: "Verwendungszweck",
        fieldName: "purpose",
        value: "",
        type: string,
    },
    believerId: {
        labelName: "Glaeubiger ID",
        csvLabelName: "Glaeubiger ID",
        fieldName: "believerId",
        value: "",
        type: string,
    },
    mandateReference: {
        labelName: "Mandatsreferenz",
        csvLabelName: "Mandatsreferenz",
        fieldName: "mandateReference",
        value: "",
        type: string,
    },
    customerReference: {
        labelName: "Kundenreferenz (End-to-End)",
        csvLabelName: "Kundenreferenz (End-to-End)",
        fieldName: "customerReference",
        value: "",
        type: string,
    },
    payPartner: {
        labelName: "Beguenstigter/Zahlungspflichtiger",
        csvLabelName: "Beguenstigter/Zahlungspflichtiger",
        fieldName: "payPartner",
        value: "",
        type: string,
    },
    iban: {
        labelName: "Kontonummer/IBAN",
        csvLabelName: "Kontonummer/IBAN",
        fieldName: "iban",
        value: "",
        type: string,
    },
    bic: {
        labelName: "BIC (SWIFT-Code)",
        csvLabelName: "BIC (SWIFT-Code)",
        fieldName: "bic",
        value: "",
        type: string,
    },
    value: {
        labelName: "Betrag",
        csvLabelName: "Betrag",
        fieldName: "value",
        value: null,
        type: number,
    },
    currency: {
        labelName: "Waehrung",
        csvLabelName: "Waehrung",
        fieldName: "currency",
        value: "",
        type: string,
    },
    info: {
        labelName: "Info",
        csvLabelName: "Info",
        fieldName: "info",
        value: "",
        type: string,
    },
};

export interface IBookingIdentityDefaultStringValues {
    id: string;
    orderAccount: string;
    bookingDate: string;
    validDate: string;
    bookingType: string;
    purpose: string;
    believerId: string;
    mandateReference: string;
    customerReference: string;
    payPartner: string;
    iban: string;
    bic: string;
    value: string;
    currency: string;
    info: string;

    [key: string]: any;
}

export interface IBookingIdentity {
    id: number;
    orderAccount: string;
    bookingDate: Date;
    validDate: Date;
    bookingType: string;
    purpose: string;
    believerId: string;
    mandateReference: string;
    customerReference: string;
    payPartner: string;
    iban: string;
    bic: string;
    value: number;
    currency: string;
    info: string;

    [key: string]: any;
}

export interface IBookingDatabase {
    id?: number;
    orderAccount?: string;
    bookingDate?: string;
    validDate?: string;
    bookingType?: string;
    purpose?: string;
    believerId?: string;
    mandateReference?: string;
    customerReference?: string;
    payPartner?: string;
    iban?: string;
    bic?: string;
    value?: number;
    currency?: string;
    info?: string;

    [key: string]: any;
}

export type objectStatus = "add" | "update" | "ignore";

export function arrayToBookingModel(arr: string[], categories: string[]): BookingModel {
    const newElement = new BookingModel();
    Object.keys(bookingFields).map((fieldName: string, index: number) => {
        const categoryIndex = categories.indexOf(bookingFields[fieldName].csvLabelName);

        const typeOfField = bookingFields[fieldName].type;

        if (typeOfField === string) {
            newElement[fieldName] = arr[categoryIndex] ? arr[categoryIndex].trim() : "";
        }
        if (typeOfField === Date) {
            newElement[fieldName] = null;
            if (arr[categoryIndex]) {
                const withTwenty = addTwentyToYear(arr[categoryIndex], ".");
                newElement[fieldName] = stringToDateWithSeparator(withTwenty, ".");
            }
        }
        if (typeOfField === number) {
            newElement[fieldName] = null;
            if (arr[categoryIndex]) {
                newElement[fieldName] = Number(arr[categoryIndex].replace(",", "."));
            }
        }
    });
    return newElement;
}

export class BookingModel implements IBookingIdentity {
    public id: number;
    public orderAccount: string;
    public bookingDate: Date;
    public validDate: Date;
    public bookingType: string;
    public purpose: string;
    public believerId: string;
    public mandateReference: string;
    public customerReference: string;
    public payPartner: string;
    public iban: string;
    public bic: string;
    public value: number;
    public currency: string;
    public info: string;

    [key: string]: any;

    public constructor() {
        this.id = 0;
    }

    public set(object: IBookingIdentityDefaultStringValues) {
        this.id = object && object.id ? Number(object.id) : bookingFields.id.value;
        this.orderAccount = object && object.orderAccount ? object.orderAccount : bookingFields.orderAccount.value;
        this.orderAccount = object && object.orderAccount ? object.orderAccount : bookingFields.orderAccount.value;
        this.bookingDate = bookingFields.bookingDate.value;
        if (object && object.bookingDate) {
            this.bookingDate = stringToDate(object.bookingDate);
        }
        this.validDate = object && object.validDate ? stringToDate(object.validDate) : bookingFields.validDate.value;
        this.bookingType = object && object.bookingType ? object.bookingType : bookingFields.bookingType.value;
        this.purpose = object && object.purpose ? object.purpose : bookingFields.purpose.value;
        this.believerId = object && object.believerId ? object.believerId : bookingFields.believerId.value;
        this.mandateReference = bookingFields.mandateReference.value;
        if (object && object.mandateReference) {
            this.mandateReference = object.mandateReference;
        }
        this.customerReference = bookingFields.customerReference.value;
        if (object && object.customerReference) {
            this.customerReference = object.customerReference;
        }
        this.payPartner = object && object.payPartner ? object.payPartner : bookingFields.payPartner.value;
        this.iban = object && object.iban ? object.iban : bookingFields.iban.value;
        this.bic = object && object.bic ? object.bic : bookingFields.bic.value;
        this.value = object && object.value ? parseFloat(object.value.replace(",", ".")) : bookingFields.value.value;
        this.currency = object && object.currency ? object.currency : bookingFields.currency.value;
        this.info = object && object.info ? object.info : bookingFields.info.value;
    }

    public  equals(object: BookingModel): objectStatus {
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
                    return "ignore";    // Beide Buchungen sind komplett gleich
                }
                return "update";    // Hinweis auf neue Buchung, andere sind veraltet
            }
        }

        return "add"; // Diese Buchung ist noch nicht vorhanden
    }
}

export function compareDateData(d1: Date, d2: Date): boolean {
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
