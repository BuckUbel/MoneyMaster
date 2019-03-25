import {
    createApiCallPathObject,
    IDBCol, IRestCallApiPaths,
} from "../helper/util";
import {Entity, IDatabaseClass, IDatabaseFields, IEntityClass, IEntityStringClass} from "../helper/Entity";
import {number, string, bool} from "prop-types";
import {AccountModel, IAccountIdentity, IAccountIdentityDefaultStringValues} from "./AccountModel";

export const shortDescriptionApiCallPaths: IRestCallApiPaths = createApiCallPathObject("/short-descriptions");

interface IShortDescriptionFields extends IDatabaseFields {
    id?: IDBCol<number>;
    originalContent?: IDBCol<string>;
    replaceContent?: IDBCol<string>;
}

export const shortDescriptionFields: IShortDescriptionFields = {
    id: {
        fieldName: "id",
        labelName: "ID",
        value: null,
        type: "number",
    },
    originalContent: {
        fieldName: "originalContent",
        labelName: "Original Inhalt",
        value: "",
        type: "string",
    },
    replaceContent: {
        fieldName: "replaceContent",
        labelName: "Ersatz Inhalt",
        value: "",
        type: "string",
    }
};

export interface IShortDescriptionIdentityDefaultStringValues extends IEntityStringClass {
    id: string;
    originalContent: string;
    replaceContent: string;

    [key: string]: any;
}

export interface IShortDescriptionIdentity extends IEntityClass {
    id: number;
    originalContent: string;
    replaceContent: string;

    [key: string]: any;
}

export interface IShortDescriptionDatabase extends IDatabaseClass {
    originalContent: string;
    replaceContent: string;
}

export class ShortDescriptionModel  extends Entity implements IShortDescriptionIdentity {

    public static createEntity(object: IAccountIdentityDefaultStringValues): IAccountIdentity {
        const entity = new AccountModel();
        entity.set(object);
        return entity;
    }

    public originalContent: string;
    public replaceContent: string;

    public set(object: IShortDescriptionIdentityDefaultStringValues) {
        this.id = Number(object.id);
        this.originalContent = object.originalContent;
        this.replaceContent = object.replaceContent;
    }

    public getDBObject(): IShortDescriptionDatabase {
        return {
            id: this.id,
            originalContent: this.originalContent,
            replaceContent: this.replaceContent
        };
    }
}
