import {
    createApiCallPathObject, Entity,
    IDatabaseClass,
    IDatabaseFields,
    IDBCol,
    IEntityClass, IEntityStringClass,
    IRestCallApiPaths
} from "../helper/util";
import {number, string, bool} from "prop-types";

export const accountApiCallPaths: IRestCallApiPaths = createApiCallPathObject("/accounts");

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
        type: number,
    },
    name: {
        fieldName: "name",
        labelName: "Kontoname",
        value: "",
        type: string,
    },
    value: {
        fieldName: "value",
        labelName: "Wert",
        value: null,
        type: number,
    },
    description: {
        fieldName: "description",
        labelName: "Beschreibung",
        value: "",
        type: string,
    },
    color: {
        fieldName: "color",
        labelName: "Farbe",
        value: "",
        type: string,
    },
    isReal: {
        fieldName: "isReal",
        labelName: "Reales Konto",
        value: false,
        type: bool,
    },
    isCore: {
        fieldName: "isCore",
        labelName: "Kern-Konto",
        value: false,
        type: bool,
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

    public name: string;
    public description: string;
    public value: number;
    public color: string;
    public isCore: boolean;
    public isReal: boolean;

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
