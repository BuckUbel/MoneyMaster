import {IHapiServer} from "../HapiServer";
import {IDatabaseFields, IEntityClass, IEntityStringClass, IRestCallApiPaths} from "../../base/helper/util";
import * as Hapi from "hapi";
import {insertEntities, loadAllEntitiesFromDB} from "../database/basicActions";

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
        handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            return loadAllEntitiesFromDB(server.database, dbTable, dbFields);
        }
    });
    server.app.route({
        method: "POST",
        path: routes.create,
        handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            const requestBody: any = request.payload;
            const objects: IEntityStringClass[] = requestBody.elements;
            const entityObjects = objects.map((object) => {
                return newEntity(object);
            });
            return insertEntities(server.database, dbTable, dbFields, entityObjects);
        }
    });
    server.app.route({
        method: "PUT",
        path: routes.update,
        handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
            // update routine
            return "";
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