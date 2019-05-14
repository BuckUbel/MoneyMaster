import {dateTo_YMDHMS_String, IDBCol, stringToDate} from "../helper/util";
import {Entity, IDatabaseClass, IDatabaseFields, IEntityClass, IEntityStringClass} from "../helper/Entity";
import {createEntityActions, IEntityActionsObject} from "../actions/Entity";

export const vBookingActions: IEntityActionsObject = createEntityActions("vBookings");

interface IVBookingFields extends IDatabaseFields {
    id?: IDBCol<number>;
    bookingId?: IDBCol<number>;
    categoryId?: IDBCol<number>;
    accountId?: IDBCol<number>;
    name?: IDBCol<string>;
    value?: IDBCol<number>;
    description?: IDBCol<string>;
    bookingDate?: IDBCol<Date>;
}

export const vBookingFields: IVBookingFields = {
    id: {
        fieldName: "id",
        labelName: "ID",
        value: null,
        type: "number",
    },
    bookingId: {
        fieldName: "booking_id",
        labelName: "Buchung",
        value: null,
        type: "number",
    },
    categoryId: {
        fieldName: "category_id",
        labelName: "ID",
        value: null,
        type: "number",
    },
    accountId: {
        fieldName: "account_id",
        labelName: "ID",
        value: null,
        type: "number",
    },
    name: {
        fieldName: "name",
        labelName: "Buchungsname",
        value: "",
        type: "string",
    },
    value: {
        fieldName: "value",
        labelName: "Wert",
        value: null,
        type: "number",
    },
    description: {
        fieldName: "description",
        labelName: "Beschreibung",
        value: "",
        type: "string",
    },
    bookingDate: {
        fieldName: "bookingDate",
        labelName: "Buchungstag",
        value: null,
        type: "date",
    }
};

export interface IVBookingIdentityDefaultStringValues extends IEntityStringClass {
    name: string;
    description: string;
    value: string;
    bookingId: string;
    accountId: string;
    categoryId: string;
    bookingDate: string;
}

export interface IVBookingIdentity extends IEntityClass {
    name: string;
    description: string;
    value: number;
    bookingId: number;
    accountId: number;
    categoryId: number;
    bookingDate: Date;
}

export interface IVBookingDatabase extends IDatabaseClass {
    name: string;
    description: string;
    value: number;
    bookingId: number;
    accountId: number;
    categoryId: number;
    bookingDate: string;
}

export class VBookingModel extends Entity implements IVBookingIdentity {

    public static createEntity(object: IVBookingIdentityDefaultStringValues): IVBookingIdentity {
        const entity = new VBookingModel();
        entity.set(object);
        return entity;
    }

    public static createEmptyEntity(): IVBookingIdentity {
        return {
            id: vBookingFields.id.value,
            name: vBookingFields.name.value,
            description: vBookingFields.description.value,
            value: vBookingFields.value.value,
            bookingId: vBookingFields.bookingId.value,
            accountId: vBookingFields.accountId.value,
            categoryId: vBookingFields.categoryId.value,
            bookingDate: vBookingFields.bookingDate.value
        };
    }

    public name: string;
    public description: string;
    public value: number;
    public bookingId: number;
    public accountId: number;
    public categoryId: number;
    public bookingDate: Date;

    public set(object: IVBookingIdentityDefaultStringValues) {
        this.id = object.id ? Number(object.id) : vBookingFields.id.value;
        this.name = object.name ? object.name : vBookingFields.name.value;
        this.description = object.description ? object.description : vBookingFields.description.value;
        this.value = object.value ? Number(object.value) : vBookingFields.value.value;
        this.bookingId = object.bookingId ? Number(object.bookingId) : vBookingFields.bookingId.value;
        this.accountId = object.accountId ? Number(object.accountId) : vBookingFields.accountId.value;
        this.categoryId = object.categoryId ? Number(object.categoryId) : vBookingFields.categoryId.value;
        this.bookingDate = vBookingFields.bookingDate.value;
        if (object && object.bookingDate) {
            this.bookingDate = stringToDate(object.bookingDate);
        }
    }

    public getDBObject(): IVBookingDatabase {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            value: this.value,
            bookingId: this.bookingId ? Number(this.bookingId) : null,
            accountId: this.accountId ? Number(this.accountId) : null,
            categoryId: this.categoryId ? Number(this.categoryId) : null,
            bookingDate: dateTo_YMDHMS_String(new Date(this.bookingDate))
        };
    }
}
