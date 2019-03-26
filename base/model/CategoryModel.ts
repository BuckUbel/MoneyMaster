import {
    IDBCol,
} from "../helper/util";
import {Entity, IDatabaseClass, IDatabaseFields, IEntityClass, IEntityStringClass} from "../helper/Entity";
import {AccountModel, IAccountIdentity, IAccountIdentityDefaultStringValues} from "./AccountModel";
import {createEntityActions, IEntityActionsObject} from "../actions/Entity";

export const categoryActions: IEntityActionsObject = createEntityActions("category");

interface ICategoriesFields extends IDatabaseFields {
    id?: IDBCol<number>;
    name?: IDBCol<string>;
    description?: IDBCol<string>;
    color?: IDBCol<string>;
    isStandard?: IDBCol<boolean>;
}

export const categoryFields: ICategoriesFields = {
    id: {
        fieldName: "id",
        labelName: "ID",
        value: null,
        type: "number",
    },
    name: {
        fieldName: "name",
        labelName: "Kategorie",
        value: "",
        type: "string",
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
        value: "",
        type: "string",
    },
    isStandard: {
        fieldName: "isStandard",
        labelName: "Standard-Kategorie",
        value: false,
        type: "boolean",
    },
};

export interface ICategoryIdentityDefaultStringValues extends IEntityStringClass {
    id: string;
    name: string;
    description: string;
    color: string;
    isStandard: string;

    [key: string]: any;
}

export interface ICategoryIdentity extends IEntityClass {
    id: number;
    name: string;
    description: string;
    color: string;
    isStandard: boolean;

    [key: string]: any;
}

export interface ICategoryDatabase extends IDatabaseClass {
    name: string;
    description: string;
    color: string;
    isStandard: number;
}

export class CategoryModel extends Entity implements ICategoryIdentity {

    public static createEntity(object: IAccountIdentityDefaultStringValues): IAccountIdentity {
        const entity = new AccountModel();
        entity.set(object);
        return entity;
    }

    public name: string;
    public description: string;
    public color: string;
    public isStandard: boolean;

    public set(object: ICategoryIdentityDefaultStringValues) {
        this.id = Number(object.id);
        this.name = object.name;
        this.description = object.description;
        this.color = object.color;
        this.isStandard = Boolean(object.isStandard);
    }

    public getDBObject(): ICategoryDatabase {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            color: this.color,
            isStandard: Number(this.isStandard),
        };
    }
}
