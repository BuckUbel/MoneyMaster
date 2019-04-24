import {IDBCol} from "./util";

export function createEntityForDB(object: IEntityClass): IDatabaseClass {
    return object.getDBObject();
}

export interface IAddActionPayload {
    entities: IEntityClass[];
}

export interface IUpdateActionPayload {
    entities: IEntityClass[];
}

export interface IDeleteActionPayload {
    ids: number[];
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

    public set(object: IEntityStringClass, ...props: any[]) {
        this.id = object.id ? Number(object.id) : null;
    }

    public getDBObject(): IDatabaseClass {
        return {id: this.id};
    }
}

export function deleteEntities(prevArray: Entity[], deleteArray: number[]): Entity[] {
    const returnArray = Object.assign([], prevArray);
    deleteArray.forEach((id: number) => {
        const foundedIndex = returnArray.findIndex((prevEntity: Entity) => {
            return prevEntity.id === id;
        });
        if (foundedIndex !== -1) {
            returnArray.splice(foundedIndex, 1);
        }
    });
    return returnArray;
}

export function updateEntities(prevArray: Entity[], newArray: Entity[]): Entity[] {
    const returnArray = Object.assign([], prevArray);
    newArray.forEach((newEntity: Entity) => {
        const foundedIndex = returnArray.findIndex((prevEntity: Entity) => {
            return prevEntity.id === newEntity.id;
        });
        if (foundedIndex !== -1) {
            returnArray[foundedIndex] = newEntity;
        } else {
            returnArray.push(newEntity);
        }
    });
    return returnArray;
}
