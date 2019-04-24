import {IDBCol} from "../helper/util";
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
    }
};

export interface IVBookingIdentityDefaultStringValues extends IEntityStringClass {
    name: string;
    description: string;
    value: string;
    bookingId: string;
    accountId: string;
    categoryId: string;
}

export interface IVBookingIdentity extends IEntityClass {
    name: string;
    description: string;
    value: number;
    bookingId: number;
    accountId: number;
    categoryId: number;
}

export interface IVBookingDatabase extends IDatabaseClass {
    name: string;
    description: string;
    value: number;
    bookingId: number;
    accountId: number;
    categoryId: number;
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
            categoryId: vBookingFields.categoryId.value
        };
    }

    public name: string;
    public description: string;
    public value: number;
    public bookingId: number;
    public accountId: number;
    public categoryId: number;

    public set(object: IVBookingIdentityDefaultStringValues) {
        this.id = object.id ? Number(object.id) : null;
        this.name = object.name ? object.name : "";
        this.description = object.description ? object.description : "";
        this.value = object.value ? Number(object.value) : 0;
        this.bookingId = object.bookingId ? Number(object.bookingId) : null;
        this.accountId = object.accountId ? Number(object.accountId) : null;
        this.categoryId = object.categoryId ? Number(object.categoryId) : null;
    }

    public getDBObject(): IVBookingDatabase {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            value: this.value,
            bookingId: this.bookingId ? Number(this.bookingId) : null,
            accountId: this.accountId ? Number(this.accountId) : null,
            categoryId: this.categoryId ? Number(this.categoryId) : null
        };
    }
}
