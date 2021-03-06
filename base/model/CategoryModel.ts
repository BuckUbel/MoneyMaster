import {
    IDBCol,
} from "../helper/util";
import {Entity, IDatabaseClass, IDatabaseFields, IEntityClass, IEntityStringClass} from "../helper/Entity";
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
        value: "#000",
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

    public static createEntity(object: ICategoryIdentityDefaultStringValues): ICategoryIdentity {
        const entity = new CategoryModel();
        entity.set(object);
        return entity;
    }

    public static createEmptyEntity(): CategoryModel {
        return new CategoryModel({
            id: categoryFields.id.value,
            name: categoryFields.name.value,
            description: categoryFields.description.value,
            color: categoryFields.color.value,
            isStandard: categoryFields.isStandard.value
        });
    }

    public name: string;
    public description: string;
    public color: string;
    public isStandard: boolean;

    public constructor(obj?: ICategoryIdentity) {
        super();
        if (obj) {
            this.id = obj.id;
            this.name = obj.name;
            this.description = obj.description;
            this.color = obj.color;
            this.isStandard = obj.isStandard;
        }
    }

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
