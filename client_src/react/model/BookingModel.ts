import {stringToDate} from "../helper/util";
import {number, string} from "prop-types";
import {Requireable} from "prop-types";

export interface IDBCol<T> {
  fieldName: string;
  value: T;
  type: Requireable<T> | DateConstructor;
}

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
    fieldName: "ID",
    value: null,
    type: number,
  },
  orderAccount: {
    fieldName: "Auftragskonto",
    value: "",
    type: string,
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
    type: string,
  },
  purpose: {
    fieldName: "Verwendungszweck",
    value: "",
    type: string,
  },
  believerId: {
    fieldName: "Glaeubiger ID",
    value: "",
    type: string,
  },
  mandateReference: {
    fieldName: "Mandatsreferenz",
    value: "",
    type: string,
  },
  customerReference: {
    fieldName: "Kundenreferenz (End-to-End)",
    value: "",
    type: string,
  },
  payPartner: {
    fieldName: "Beguenstigter/Zahlungspflichtiger",
    value: "",
    type: string,
  },
  iban: {
    fieldName: "Kontonummer/IBAN",
    value: "",
    type: string,
  },
  bic: {
    fieldName: "BIC (SWIFT-Code)",
    value: "",
    type: string,
  },
  value: {
    fieldName: "Betrag",
    value: null,
    type: number,
  },
  currency: {
    fieldName: "Waehrung",
    value: "",
    type: string,
  },
  info: {
    fieldName: "Info",
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
}

export interface IBookingDisplay {
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

export function arrayToBookingModel(arr: string[], categories: string[]): IBookingIdentity {
  // const fields = Object.keys(bookingFields);
  const newElement = new BookingModel();
  Object.keys(bookingFields).map((fieldName: string, index: number) => {
    const categoryIndex = categories.indexOf(bookingFields[fieldName].fieldName);
    newElement[fieldName] = arr[categoryIndex];
  });
  return newElement;
  // const fields = Object.keys(bookingFields);
  // const newElement = new BookingModel();
  // bookingFields.forEach((prop: IDBCol<any>, index: number) => {
  //   const categoryIndex = categories.indexOf(prop.fieldName);
  //   const propName = fields[index];
  //   newElement[propName] = arr[categoryIndex];
  // });
  // return newElement;
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
    this.bookingDate = object && object.bookingDate ? stringToDate(object.bookingDate) : bookingFields.bookingDate.value;
    this.validDate = object && object.validDate ? stringToDate(object.validDate) : bookingFields.validDate.value;
    this.bookingType = object && object.bookingType ? object.bookingType : bookingFields.bookingType.value;
    this.purpose = object && object.purpose ? object.purpose : bookingFields.purpose.value;
    this.believerId = object && object.believerId ? object.believerId : bookingFields.believerId.value;
    this.mandateReference = object && object.mandateReference ? object.mandateReference : bookingFields.mandateReference.value;
    this.customerReference = object && object.customerReference ? object.customerReference : bookingFields.customerReference.value;
    this.payPartner = object && object.payPartner ? object.payPartner : bookingFields.payPartner.value;
    this.iban = object && object.iban ? object.iban : bookingFields.iban.value;
    this.bic = object && object.bic ? object.bic : bookingFields.bic.value;
    this.value = object && object.value ? parseFloat(object.value.replace(",", ".")) : bookingFields.value.value;
    this.currency = object && object.currency ? object.currency : bookingFields.currency.value;
    this.info = object && object.info ? object.info : bookingFields.info.value;
  }
}
