"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../helper/util");
const Entity_1 = require("../helper/Entity");
const Entity_2 = require("../actions/Entity");
exports.vBookingActions = Entity_2.createEntityActions("vBookings");
exports.vBookingFields = {
    id: {
        fieldName: "id",
        labelName: "ID",
        value: null,
        type: "number",
    },
    bookingId: {
        fieldName: "booking_id",
        labelName: "Buchung",
        value: null,
        type: "number",
    },
    categoryId: {
        fieldName: "category_id",
        labelName: "ID",
        value: null,
        type: "number",
    },
    accountId: {
        fieldName: "account_id",
        labelName: "ID",
        value: null,
        type: "number",
    },
    name: {
        fieldName: "name",
        labelName: "Buchungsname",
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
    bookingDate: {
        fieldName: "bookingDate",
        labelName: "Buchungstag",
        value: null,
        type: "date",
    }
};
class VBookingModel extends Entity_1.Entity {
    static createEntity(object) {
        const entity = new VBookingModel();
        entity.set(object);
        return entity;
    }
    static createEmptyEntity() {
        return {
            id: exports.vBookingFields.id.value,
            name: exports.vBookingFields.name.value,
            description: exports.vBookingFields.description.value,
            value: exports.vBookingFields.value.value,
            bookingId: exports.vBookingFields.bookingId.value,
            accountId: exports.vBookingFields.accountId.value,
            categoryId: exports.vBookingFields.categoryId.value,
            bookingDate: exports.vBookingFields.bookingDate.value
        };
    }
    set(object) {
        this.id = object.id ? Number(object.id) : exports.vBookingFields.id.value;
        this.name = object.name ? object.name : exports.vBookingFields.name.value;
        this.description = object.description ? object.description : exports.vBookingFields.description.value;
        this.value = object.value ? Number(object.value) : exports.vBookingFields.value.value;
        this.bookingId = object.bookingId ? Number(object.bookingId) : exports.vBookingFields.bookingId.value;
        this.accountId = object.accountId ? Number(object.accountId) : exports.vBookingFields.accountId.value;
        this.categoryId = object.categoryId ? Number(object.categoryId) : exports.vBookingFields.categoryId.value;
        this.bookingDate = exports.vBookingFields.bookingDate.value;
        if (object && object.bookingDate) {
            this.bookingDate = util_1.stringToDate(object.bookingDate);
        }
    }
    getDBObject() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            value: this.value,
            bookingId: this.bookingId ? Number(this.bookingId) : null,
            accountId: this.accountId ? Number(this.accountId) : null,
            categoryId: this.categoryId ? Number(this.categoryId) : null,
            bookingDate: util_1.dateTo_YMDHMS_String(new Date(this.bookingDate))
        };
    }
}
exports.VBookingModel = VBookingModel;
