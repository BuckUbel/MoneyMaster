import {IDBCol} from "./util";

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
export interface IDatabaseClass {
    id: number;

    [key: string]: any;
}

export interface IDatabaseFields {
    [key: string]: IDBCol<any>;
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

