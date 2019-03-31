"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const basicActions_1 = require("../database/basicActions");
const ErrorMessage_1 = require("../../base/helper/messages/ErrorMessage");
function standardEntityRouting(server, dbTable, dbFields, routes, newEntity) {
    server.app.route({
        method: "GET",
        path: routes.read,
        handler: (request, h) => __awaiter(this, void 0, void 0, function* () {
            return yield basicActions_1.loadAllEntitiesFromDB(server.database, dbTable, dbFields).then((result) => {
                return result;
            }).catch((e) => {
                console.log(e);
                return new ErrorMessage_1.ErrorMessage("Databank Fehler", e);
            });
        })
    });
    server.app.route({
        method: "GET",
        path: routes.readOne + "{index*}",
        handler: (request, h) => {
            // load one Entity
            return "";
        }
    });
    server.app.route({
        method: "POST",
        path: routes.create,
        handler: (request, h) => {
            const requestBody = request.payload;
            const objects = requestBody.entities;
            const entityObjects = objects.map((object) => {
                return newEntity(object);
            });
            return basicActions_1.insertEntities(server.database, dbTable, dbFields, entityObjects);
        }
    });
    server.app.route({
        method: "PUT",
        path: routes.update,
        handler: (request, h) => {
            // update routine
            return "";
        }
    });
    server.app.route({
        method: "DELETE",
        path: routes.delete,
        handler: (request, h) => {
            // delete routine
            return "";
        }
    });
}
exports.standardEntityRouting = standardEntityRouting;
