import {
    addTwentyToYear, dateTo_YMDHMS_String,
    IDBCol,
    stringToDate,
    stringToDateWithSeparator
} from "../helper/util";
import {Entity, IDatabaseClass, IDatabaseFields, IEntityClass, IEntityStringClass} from "../helper/Entity";
import {createEntityActions, IEntityActionsObject} from "../actions/Entity";

export const bookingActions: IEntityActionsObject = createEntityActions("booking");

interface IBookingsFields extends IDatabaseFields {
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
}

export const bookingFields: IBookingsFields = {
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

export interface IBookingIdentityDefaultStringValues extends IEntityStringClass {
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
}

export interface IBookingIdentity extends IEntityClass {
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
}

export interface IBookingDatabase extends IDatabaseClass {
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
}

export type objectStatus = "add" | "update" | "ignore";

export function arrayToBookingModel(arr: string[], categories: string[]): BookingModel {
    const newElement = new BookingModel();
    Object.keys(bookingFields).map((fieldName: string, index: number) => {
        const categoryIndex = categories.indexOf(bookingFields[fieldName].csvLabelName);

        const typeOfField = bookingFields[fieldName].type;

        if (typeOfField === "string") {
            newElement[fieldName] = arr[categoryIndex] ? arr[categoryIndex].trim() : "";
        }
        if (typeOfField === "date") {
            newElement[fieldName] = null;
            if (arr[categoryIndex]) {
                // TODO: make from string a utc date
                const withTwenty = addTwentyToYear(arr[categoryIndex], ".");
                newElement[fieldName] = stringToDateWithSeparator(withTwenty, ".");
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

export class BookingModel extends Entity implements IBookingIdentity {

    public static createEntity(object: IBookingIdentityDefaultStringValues): IBookingIdentity {
        const entity = new BookingModel();
        entity.set(object);
        return entity;
    }

    public static createEmptyEntity(): BookingModel {
        return new BookingModel({
            id: bookingFields.id.value,
            orderAccount: bookingFields.orderAccount.value,
            bookingDate: bookingFields.bookingDate.value,
            validDate: bookingFields.validDate.value,
            bookingType: bookingFields.bookingType.value,
            purpose: bookingFields.purpose.value,
            believerId: bookingFields.believerId.value,
            mandateReference: bookingFields.mandateReference.value,
            customerReference: bookingFields.customerReference.value,
            payPartner: bookingFields.payPartner.value,
            iban: bookingFields.iban.value,
            bic: bookingFields.bic.value,
            value: bookingFields.value.value,
            currency: bookingFields.currency.value,
            info: bookingFields.info.value,
        });
    }

    public static getLastDate(bookings: BookingModel[]): Date {
        return BookingModel.getHighestDate(bookings, true);
    }

    public static getFirstDate(bookings: BookingModel[]): Date {
        return BookingModel.getHighestDate(bookings, false);
    }

    private static getHighestDate(bookings: BookingModel[], max: boolean): Date {
        const dates: number[] = bookings.map((booking): number => {
            const startDate = booking.bookingDate;
            return startDate !== null ? startDate.getTime() : 0;
        });
        if (max) {
            return new Date(Math.max(...dates));
        }
        return new Date(Math.min(...dates));
    }

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

    public constructor(obj?: IBookingIdentity) {
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
        this.value = bookingFields.value.value;
        if (object && object.value) {
            this.value = Number(Number(object.value.replace(",", ".")).toFixed(2));
        }
        this.currency = object && object.currency ? object.currency : bookingFields.currency.value;
        this.info = object && object.info ? object.info : bookingFields.info.value;
    }

    public getDBObject(): IBookingDatabase {
        return {
            id: this.id,
            orderAccount: this.orderAccount,
            bookingDate: dateTo_YMDHMS_String(new Date(this.bookingDate)),
            validDate: dateTo_YMDHMS_String(new Date(this.validDate)),
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

    public equals(object: BookingModel): objectStatus {
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
    // TODO: use only day, month and of these dates and form to utc
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
