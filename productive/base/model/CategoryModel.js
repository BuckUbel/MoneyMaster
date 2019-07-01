"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = require("../helper/Entity");
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
class CategoryModel extends Entity_1.Entity {
    static createEntity(object) {
        const entity = new CategoryModel();
        entity.set(object);
        return entity;
    }
    static createEmptyEntity() {
        return new CategoryModel({
            id: exports.categoryFields.id.value,
            name: exports.categoryFields.name.value,
            description: exports.categoryFields.description.value,
            color: exports.categoryFields.color.value,
            isStandard: exports.categoryFields.isStandard.value
        });
    }
    constructor(obj) {
        super();
        if (obj) {
            this.id = obj.id;
            this.name = obj.name;
            this.description = obj.description;
            this.color = obj.color;
            this.isStandard = obj.isStandard;
        }
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
