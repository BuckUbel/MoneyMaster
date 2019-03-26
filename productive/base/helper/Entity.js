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
    set(object) {
        this.id = object.id ? Number(object.id) : null;
    }
    getDBObject() {
        return { id: this.id };
    }
}
exports.Entity = Entity;
