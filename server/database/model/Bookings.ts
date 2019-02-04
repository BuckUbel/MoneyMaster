import { IDBCol } from "./DefaultModel";
import { IDatabase } from "../../database";
import { any, bool, number, string } from "prop-types";
import { Query } from "mysql";

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

  [ key: string ]: any;
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
    fieldName: "beliverId",
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
    return bookingFields[ key ].fieldName + " as " + key;
  });

  const rowNames = rowNamesArray.join(", ");

  let queryString = (
    "SELECT " + rowNames + " " +
    "FROM " + tableName + " m "
  );

  if (limit) {
    queryString += "LIMIT " + limit + " ";
  }

  return db.sqlQuery(queryString,
  ).then((rows: Query) => {
    return rows;
  }).catch((error) => {
    return error;
  });
}
