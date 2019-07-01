"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createEntityForDB(object) {
    return object.getDBObject();
}
exports.createEntityForDB = createEntityForDB;
class Entity {
    static createEntity(object) {
        const entity = new Entity();
        entity.set(object);
        return entity;
    }
    constructor() {
        this.id = 0;
    }
    set(object, ...props) {
        this.id = object.id ? Number(object.id) : null;
    }
    getDBObject() {
        return { id: this.id };
    }
}
exports.Entity = Entity;
function deleteEntities(prevArray, deleteArray) {
    const returnArray = Object.assign([], prevArray);
    deleteArray.forEach((id) => {
        const foundedIndex = returnArray.findIndex((prevEntity) => {
            return prevEntity.id === id;
        });
        if (foundedIndex !== -1) {
            returnArray.splice(foundedIndex, 1);
        }
    });
    return returnArray;
}
exports.deleteEntities = deleteEntities;
function updateEntities(prevArray, newArray) {
    const returnArray = Object.assign([], prevArray);
    newArray.forEach((newEntity) => {
        const foundedIndex = returnArray.findIndex((prevEntity) => {
            return prevEntity.id === newEntity.id;
        });
        if (foundedIndex !== -1) {
            returnArray[foundedIndex] = newEntity;
        }
        else {
            returnArray.push(newEntity);
        }
    });
    return returnArray;
}
exports.updateEntities = updateEntities;
