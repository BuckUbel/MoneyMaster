"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = require("../helper/Entity");
const Entity_2 = require("../actions/Entity");
exports.shortDescriptionActions = Entity_2.createEntityActions("short-descriptions");
exports.shortDescriptionFields = {
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
class ShortDescriptionModel extends Entity_1.Entity {
    static createEntity(object) {
        const entity = new ShortDescriptionModel();
        entity.set(object);
        return entity;
    }
    static createEmptyEntity() {
        return new ShortDescriptionModel({
            id: exports.shortDescriptionFields.id.value,
            originalContent: exports.shortDescriptionFields.originalContent.value,
            replaceContent: exports.shortDescriptionFields.replaceContent.value,
        });
    }
    constructor(obj) {
        super();
        if (obj) {
            this.id = obj.id;
            this.originalContent = obj.originalContent;
            this.replaceContent = obj.replaceContent;
        }
    }
    set(object) {
        this.id = Number(object.id);
        this.originalContent = object.originalContent;
        this.replaceContent = object.replaceContent;
    }
    getDBObject() {
        return {
            id: this.id,
            originalContent: this.originalContent,
            replaceContent: this.replaceContent
        };
    }
}
exports.ShortDescriptionModel = ShortDescriptionModel;
