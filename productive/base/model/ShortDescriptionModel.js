"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../helper/util");
const Entity_1 = require("../helper/Entity");
const AccountModel_1 = require("./AccountModel");
exports.shortDescriptionApiCallPaths = util_1.createApiCallPathObject("/short-descriptions");
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
        const entity = new AccountModel_1.AccountModel();
        entity.set(object);
        return entity;
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
