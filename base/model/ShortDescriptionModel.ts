import {
    IDBCol,
} from "../helper/util";
import {Entity, IDatabaseClass, IDatabaseFields, IEntityClass, IEntityStringClass} from "../helper/Entity";
import {createEntityActions, IEntityActionsObject} from "../actions/Entity";

export const shortDescriptionActions: IEntityActionsObject = createEntityActions("short-descriptions");

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

export class ShortDescriptionModel extends Entity implements IShortDescriptionIdentity {

    public static createEntity(object: IShortDescriptionIdentityDefaultStringValues): IShortDescriptionIdentity {
        const entity = new ShortDescriptionModel();
        entity.set(object);
        return entity;
    }

    public static createEmptyEntity(): ShortDescriptionModel {
        return new ShortDescriptionModel({
            id: shortDescriptionFields.id.value,
            originalContent: shortDescriptionFields.originalContent.value,
            replaceContent: shortDescriptionFields.replaceContent.value,
        });
    }

    public originalContent: string;
    public replaceContent: string;

    public constructor(obj?: IShortDescriptionIdentity) {
        super();
        if (obj) {
            this.id = obj.id;
            this.originalContent = obj.originalContent;
            this.replaceContent = obj.replaceContent;
        }
    }

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
