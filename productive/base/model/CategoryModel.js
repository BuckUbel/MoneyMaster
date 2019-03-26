"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = require("../helper/Entity");
const AccountModel_1 = require("./AccountModel");
const Entity_2 = require("../actions/Entity");
exports.categoryActions = Entity_2.createEntityActions("category");
exports.categoryFields = {
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
class CategoryModel extends Entity_1.Entity {
    static createEntity(object) {
        const entity = new AccountModel_1.AccountModel();
        entity.set(object);
        return entity;
    }
    set(object) {
        this.id = Number(object.id);
        this.name = object.name;
        this.description = object.description;
        this.color = object.color;
        this.isStandard = Boolean(object.isStandard);
    }
    getDBObject() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            color: this.color,
            isStandard: Number(this.isStandard),
        };
    }
}
exports.CategoryModel = CategoryModel;
