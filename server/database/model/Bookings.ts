import {IDatabase} from "../../database";
import {bookingFields, BookingModel, IBookingDatabase} from "../../../base/model/BookingModel";
import {dateTo_YMDHMS_String} from "../../../base/helper/util";

const tableName: string = process.env.BOOKING_TABLE_NAME;

export class Booking implements IBookingDatabase {

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

export async function updateABooking(db: IDatabase, booking: IBookingDatabase) {

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
