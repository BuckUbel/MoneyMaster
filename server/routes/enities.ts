import {IHapiServer} from "../HapiServer";
import {IRestCallApiPaths} from "../../base/helper/util";
import * as Hapi from "hapi";
import {insertEntities, loadAllEntitiesFromDB, loadOneEntityFromDB, updateEntities} from "../database/basicActions";
import {IDatabaseFields, IEntityClass, IEntityStringClass} from "../../base/helper/Entity";
import {ErrorMessage} from "../../base/helper/messages/ErrorMessage";

export function standardEntityRouting(
    server: IHapiServer,
    dbTable: string,
    dbFields: IDatabaseFields,
    routes: IRestCallApiPaths,
    newEntity: (object: IEntityStringClass) => IEntityClass,
) {
    server.app.route({
        method: "GET",
        path: routes.read,
        handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            return await loadAllEntitiesFromDB(server.database, dbTable, dbFields).then((result) => {
                return result;
            }).catch((e: string) => {
                console.error(e);
                return new ErrorMessage("Databank Fehler", e);
            });
        }
    });
    server.app.route({
        method: "GET",
        path: routes.readOne + "{index*1}",
        handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {

            // load one Entity
            const id: number = Number(request.params.index);
            return await loadOneEntityFromDB(server.database, dbTable, dbFields, id).then((result) => {
                return result;
            }).catch((e: string) => {
                console.error(e);
                return new ErrorMessage("Databank Fehler", e);
            });
        }
    });
    server.app.route({
        method: "POST",
        path: routes.create,
        handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            const requestBody: any = request.payload;
            const objects: IEntityStringClass[] = requestBody.entities;
            const entityObjects = objects.map((object) => {
                return newEntity(object);
            });
            return await insertEntities(server.database, dbTable, dbFields, entityObjects)
                .then((result) => {
                    return result;
                })
                .catch((e: string) => {
                    console.error(e);
                    return new ErrorMessage("Datenbank Fehler", e);
                });
        }
    });
    server.app.route({
        method: "PUT",
        path: routes.update,
        handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            // update routine
            const requestBody: any = request.payload;
            const objects: IEntityStringClass[] = requestBody.entities;
            const entityObjects = objects.map((object) => {
                return newEntity(object);
            });
            return await updateEntities(server.database, dbTable, dbFields, entityObjects)
                .then((result) => {
                    return result;
                })
                .catch((e: string) => {
                    console.error(e);
                    return new ErrorMessage("Datenbank Fehler", e);
                });
        }
    });
    server.app.route({
        method: "DELETE",
        path: routes.delete,
        handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            // delete routine
            return "";
        }
    });
}