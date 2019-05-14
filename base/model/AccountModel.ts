import {IDBCol} from "../helper/util";
import {Entity, IDatabaseClass, IDatabaseFields, IEntityClass, IEntityStringClass} from "../helper/Entity";
import {createEntityActions, IEntityActionsObject} from "../actions/Entity";

export const accountActions: IEntityActionsObject = createEntityActions("accounts");

interface IAccountFields extends IDatabaseFields {
    id?: IDBCol<number>;
    name?: IDBCol<string>;
    value?: IDBCol<number>;
    description?: IDBCol<string>;
    color?: IDBCol<string>;
    isReal?: IDBCol<boolean>;
    isCore?: IDBCol<boolean>;
}

export const accountFields: IAccountFields = {
    id: {
        fieldName: "id",
        labelName: "ID",
        value: null,
        type: "number",
    },
    name: {
        fieldName: "name",
        labelName: "Kontoname",
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
    color: {
        fieldName: "color",
        labelName: "Farbe",
        value: "#000",
        type: "string",
    },
    isReal: {
        fieldName: "isReal",
        labelName: "Reales Konto",
        value: false,
        type: "boolean",
    },
    isCore: {
        fieldName: "isCore",
        labelName: "Kern-Konto",
        value: false,
        type: "boolean",
    },
};

export interface IAccountIdentityDefaultStringValues extends IEntityStringClass {
    name: string;
    description: string;
    value: string;
    color: string;
    isCore: string;
    isReal: string;
}

export interface IAccountIdentity extends IEntityClass {
    name: string;
    description: string;
    value: number;
    color: string;
    isCore: boolean;
    isReal: boolean;
}

export interface IAccountDatabase extends IDatabaseClass {
    name: string;
    description: string;
    value: number;
    color: string;
    isReal: number;
    isCore: number;
}

export class AccountModel extends Entity implements IAccountIdentity {

    public static createEntity(object: IAccountIdentityDefaultStringValues): IAccountIdentity {
        const entity = new AccountModel();
        entity.set(object);
        return entity;
    }

    public static createEmptyEntity(): AccountModel {
        return new AccountModel({
            id: accountFields.id.value,
            name: accountFields.name.value,
            description: accountFields.description.value,
            value: accountFields.value.value,
            color: accountFields.color.value,
            isReal: accountFields.isReal.value,
            isCore: accountFields.isCore.value
        });
    }

    public name: string;
    public description: string;
    public value: number;
    public color: string;
    public isCore: boolean;
    public isReal: boolean;

    public constructor(obj?: IAccountIdentity) {
        super();
        if (obj) {
            this.id = obj.id;
            this.name = obj.name;
            this.description = obj.description;
            this.color = obj.color;
            this.isCore = obj.isCore;
            this.isReal = obj.isReal;
            this.value = obj.value;
        }
    }

    public set(object: IAccountIdentityDefaultStringValues) {
        this.id = object.id ? Number(object.id) : null;
        this.name = object.name;
        this.description = object.description;
        this.value = Number(object.value);
        this.color = object.color;
        this.isCore = Boolean(object.isCore);
        this.isReal = Boolean(object.isReal);
    }

    public getDBObject(): IAccountDatabase {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            value: this.value,
            color: this.color,
            isReal: Number(this.isReal),
            isCore: Number(this.isCore)
        };
    }
}
