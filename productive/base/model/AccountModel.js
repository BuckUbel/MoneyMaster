"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../helper/util");
const Entity_1 = require("../helper/Entity");
exports.accountApiCallPaths = util_1.createApiCallPathObject("/accounts");
exports.accountFields = {
    id: {
        fieldName: "id",
        labelName: "ID",
        value: null,
        type: "number",
    },
    name: {
        fieldName: "name",
        labelName: "Kontoname",
        value: "",
        type: "string",
    },
    value: {
        fieldName: "value",
        labelName: "Wert",
        value: null,
        type: "number",
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
    isReal: {
        fieldName: "isReal",
        labelName: "Reales Konto",
        value: false,
        type: "boolean",
    },
    isCore: {
        fieldName: "isCore",
        labelName: "Kern-Konto",
        value: false,
        type: "boolean",
    },
};
class AccountModel extends Entity_1.Entity {
    static createEntity(object) {
        const entity = new AccountModel();
        entity.set(object);
        return entity;
    }
    set(object) {
        this.id = object.id ? Number(object.id) : null;
        this.name = object.name;
        this.description = object.description;
        this.value = Number(object.value);
        this.color = object.color;
        this.isCore = Boolean(object.isCore);
        this.isReal = Boolean(object.isReal);
    }
    getDBObject() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            value: this.value,
            color: this.color,
            isReal: Number(this.isReal),
            isCore: Number(this.isCore)
        };
    }
}
exports.AccountModel = AccountModel;
