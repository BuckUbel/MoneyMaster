"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const basicActions_1 = require("../database/basicActions");
function standardEntityRouting(server, dbTable, dbFields, routes, newEntity) {
    server.app.route({
        method: "GET",
        path: routes.read,
        handler: (request, h) => {
            return basicActions_1.loadAllEntitiesFromDB(server.database, dbTable, dbFields);
        }
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
