import {Requireable} from "prop-types";

export function dateToDayString(date: Date): string {
  return basicDateToString(date, "-");
}

export function beautyDateString(date: Date): string {
  return date ? basicDateToString(date, ".") : "";
}

export function beautyDateTimeString(date: Date): string {
  return beautyDateString(date) + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}

export function basicDateToString(date: Date, delimiter: string): string {
  let month = "" + (date.getMonth() + 1);
  let day = "" + date.getDate();
  const year = date.getFullYear();

  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) {
    day = "0" + day;
  }

  return [day, month, year].join(delimiter);
}

export function addTwentyToYear(s: string, separator: string) {
  const dateFields = s.split(separator);
  const day = dateFields[0];
  const month = dateFields[1];
  const year = dateFields[2];
  return day + separator + month + separator + "20" + year;
}

export function stringToDateWithSeparator(s: string, separator: string): Date {
  const dateFields = s.split(separator);
  const day = dateFields[0];
  const month = dateFields[1];
  const year = dateFields[2];
  return new Date(year + "-" + month + "-" + day);
}

export function stringToDate(s: string): Date {
  return Date.parse(s) ? new Date(Date.parse(s)) : null;
}

export function getStringValues(element: string, separator: string): string[] {
  return element.split(separator).map((p: string): string => {
    return p ? p.replace(/[\"]/gi, "") : "";
  });
}

export function dateTo_YMDHMS_String(d: Date): string {
  return d.getFullYear() + "-" + (d.getMonth() + 1)
    + "-" + d.getDate() + " " + d.getHours() + ":"
    + d.getMinutes() + ":" + d.getSeconds();
}

export interface IDBCol<T> {
  fieldName: string;
  value: T;
  type: Requireable<T> | DateConstructor;
}
