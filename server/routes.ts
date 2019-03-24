import * as Hapi from "hapi";
import {IHapiServer} from "./HapiServer";
import BookingRoutes from "./routes/bookings";
import {
    accountApiCallPaths,
    accountFields, AccountModel,
} from "../base/model/AccountModel";
import {bookingApiCallPaths, bookingFields, BookingModel} from "../base/model/BookingModel";
import {
    shortDescriptionApiCallPaths,
    shortDescriptionFields,
    ShortDescriptionModel
} from "../base/model/ShortDescriptionModel";
import {categoryApiCallPaths, categoryFields, CategoryModel} from "../base/model/CategoryModel";
import {standardEntityRouting} from "./routes/enities";

export default class ServerRoutes {

    public server: IHapiServer;

    public constructor(server: IHapiServer) {
        this.server = server;
    }

    public staticFileRouting() {
        this.server.app.route({
            method: "GET",
            path: "/{any*}",
            handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
                return h.file(this.server.serverConfig.entryFile);
            }
        });
        this.server.app.route({
            method: "GET",
            path: "/public/{param*}",
            handler: {
                directory: {
                    path: this.server.serverConfig.publicDir
                }
            }
        });
    }

    public restAPIRouting() {
        standardEntityRouting(
            this.server,
            this.server.database.config.tableNames.bookings,
            bookingFields,
            bookingApiCallPaths,
            BookingModel.createEntity
        );
        standardEntityRouting(
            this.server,
            this.server.database.config.tableNames.accounts,
            accountFields,
            accountApiCallPaths,
            AccountModel.createEntity
        );
        standardEntityRouting(
            this.server,
            this.server.database.config.tableNames.shortDescriptions,
            shortDescriptionFields,
            shortDescriptionApiCallPaths,
            ShortDescriptionModel.createEntity
        );
        standardEntityRouting(
            this.server,
            this.server.database.config.tableNames.categories,
            categoryFields,
            categoryApiCallPaths,
            CategoryModel.createEntity
        );
    }

    public async init() {

        await this.server.app.register(require("inert"));
        this.staticFileRouting();
        this.restAPIRouting();

        const bookingRoutes = new BookingRoutes(this.server);
        await bookingRoutes.init();
    }
}
