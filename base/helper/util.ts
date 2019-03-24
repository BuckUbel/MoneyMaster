import {Requireable} from "prop-types";
import {AccountModel, IAccountDatabase, IAccountIdentityDefaultStringValues} from "../model/AccountModel";

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

export interface IRestCallApiPaths {
    create: string;
    read: string;
    readOne: string;
    update: string;
    delete: string;
}

export const apiPath: string = "/api";

export const standardApiCallPaths: IRestCallApiPaths = {
    create: "/create",
    read: "/load",
    readOne: "/{index*}",
    update: "/update",
    delete: "/delete",
};

export function createApiCallPathObject(entityString: string): IRestCallApiPaths {
    return {
        create: apiPath + entityString + standardApiCallPaths.create,
        read: apiPath + entityString + standardApiCallPaths.read,
        readOne: apiPath + entityString + standardApiCallPaths.readOne,
        update: apiPath + entityString + standardApiCallPaths.update,
        delete: apiPath + entityString + standardApiCallPaths.delete,
    };
}

export function createEntityForDB(object: IEntityClass): IDatabaseClass {
    return object.getDBObject();
}

export interface IEntityStringClass {
    id: string;

    [key: string]: any;
}

export interface IEntityClass {
    id: number;

    [key: string]: any;
}

export class Entity implements IEntityClass {
    public static createEntity(object: IEntityStringClass): IEntityClass {
        const entity = new Entity();
        entity.set(object);
        return entity;
    }

    [key: string]: any;

    public id: number;

    public constructor() {
        this.id = 0;
    }

    public set(object: IEntityStringClass) {
        this.id = object.id ? Number(object.id) : null;
    }

    public getDBObject(): IDatabaseClass {
        return {id: this.id};
    }
}

export interface IDatabaseClass {
    id: number;

    [key: string]: any;
}

export interface IDatabaseFields {
    [key: string]: IDBCol<any>;
}

export interface IDBCol<T> {
    fieldName: string;
    labelName: string;
    csvLabelName?: string;
    value: T;
    type: Requireable<T> | DateConstructor;
}
