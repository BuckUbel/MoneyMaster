"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Entity_1 = require("../helper/Entity");
const Entity_2 = require("../actions/Entity");
exports.accountActions = Entity_2.createEntityActions("accounts");
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
        value: "#000",
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
    static createEmptyEntity() {
        return new AccountModel({
            id: exports.accountFields.id.value,
            name: exports.accountFields.name.value,
            description: exports.accountFields.description.value,
            value: exports.accountFields.value.value,
            color: exports.accountFields.color.value,
            isReal: exports.accountFields.isReal.value,
            isCore: exports.accountFields.isCore.value
        });
    }
    constructor(obj) {
        super();
        if (obj) {
            this.id = obj.id;
            this.name = obj.name;
            this.description = obj.description;
            this.color = obj.color;
            this.isCore = obj.isCore;
            this.isReal = obj.isReal;
            this.value = obj.value;
        }
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
