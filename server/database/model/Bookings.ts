import {IDBCol} from "./DefaultModel";
import {IDatabase} from "../../database";
import {any, bool, number, string} from "prop-types";
import {Query} from "mysql";
import {BookingModel, IBookingIdentityDefaultStringValues} from "./BookingModel";

export interface IBookingsObjectPropsFromRequest {
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

export interface IBookingsObjectProps {
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

export function dateTo_YMDHMS_String(d: Date): string {
  return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
}

export class Booking implements IBookingsObjectProps {

  public id: number;
  public orderAccount: string;
  public bookingDate: string;
  public validDate: string;
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

  public constructor(object: BookingModel) {
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
  value?: IDBCol<string>;
  currency?: IDBCol<string>;
  info?: IDBCol<string>;

  [key: string]: any;
}

export const bookingFields: IBookingsFields = {
  id: {
    fieldName: "id",
    value: null,
    type: number,
  },
  orderAccount: {
    fieldName: "orderAccount",
    value: "",
    type: string,
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
    type: string,
  },
  purpose: {
    fieldName: "purpose",
    value: "",
    type: string,
  },
  believerId: {
    fieldName: "believerId",
    value: "",
    type: string,
  },
  mandateReference: {
    fieldName: "mandateReference",
    value: "",
    type: string,
  },
  customerReference: {
    fieldName: "customerReference",
    value: "",
    type: string,
  },
  payPartner: {
    fieldName: "payPartner",
    value: "",
    type: string,
  },
  iban: {
    fieldName: "iban",
    value: "",
    type: string,
  },
  bic: {
    fieldName: "bic",
    value: "",
    type: string,
  },
  value: {
    fieldName: "value",
    value: "",
    type: string,
  },
  currency: {
    fieldName: "currency",
    value: "",
    type: string,
  },
  info: {
    fieldName: "info",
    value: "",
    type: string,
  },
};

const tableName: string = "bookings";

export async function loadAllBookingsFromDB(db: IDatabase, limit?: number) {

  const rowNamesArray = Object.keys(bookingFields).map((key) => {
    return bookingFields[key].fieldName + " as " + key;
  });

  const rowNames = rowNamesArray.join(", ");

  let queryString = (
    "SELECT " + rowNames + " " +
    "FROM " + tableName + " m "
  );

  if (limit) {
    queryString += "LIMIT " + limit + " ";
  }

  return await db.sqlQuery(queryString);
}

export async function insertABooking(db: IDatabase, bookings: BookingModel[]) {

  const rowNamesArray = Object.keys(bookingFields).reduce((filtered: any[], key) => {
    if (key !== "id") {
      filtered.push(bookingFields[key].fieldName);
    }
    return filtered;
  }, []);
  const rowNames = rowNamesArray.join(", ");

  const bookingStringArray: string[] = bookings.map((booking): string => {
    const newBooking = new Booking(booking);
    const valueArray = Object.keys(newBooking).reduce((filtered: any[], key) => {
      if (key !== "id") {
        filtered.push(newBooking[key]);
      }
      return filtered;
    }, []);

    return "('" + valueArray.join("', '") + "')";
  });

  const values = bookingStringArray.join(", ");

  const queryString = (
    "INSERT INTO " + tableName + " (" + rowNames + ") VALUES " + values + ""
  );
  return await db.sqlQuery(queryString);
}

export async function updateABooking(db: IDatabase, booking: IBookingsObjectProps) {

  const rowNamesArray = Object.keys(bookingFields).map((key) => {
    return bookingFields[key].fieldName + " as " + key;
  });

  const valueArray = Object.keys(booking).map((key) => booking[key]);
  const rowNames = rowNamesArray.join(", ");
  const values = "'" + valueArray.join("', '") + "'";

  const queryString = (
    "INSERT INTO " + tableName + " (" + rowNames + ") VALUES (" + values + ")"
  );

  return db.sqlQuery("",
  ).then((rows: any[]) => {
    return rows;
  }).catch((error) => {
    return error;
  });
}
