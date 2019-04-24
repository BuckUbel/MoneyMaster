import * as Hapi from "hapi";
import {IHapiServer} from "./HapiServer";
import BookingRoutes from "./routes/bookings";
import {
    accountActions,
    accountFields, AccountModel,
} from "../base/model/AccountModel";
import {bookingActions, bookingFields, BookingModel} from "../base/model/BookingModel";
import {
    shortDescriptionActions,
    shortDescriptionFields,
    ShortDescriptionModel
} from "../base/model/ShortDescriptionModel";
import {categoryActions, categoryFields, CategoryModel} from "../base/model/CategoryModel";
import {standardEntityRouting} from "./routes/enities";
import {vBookingActions, vBookingFields, VBookingModel} from "../base/model/VBookingModel";

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
            bookingActions.apiPaths,
            BookingModel.createEntity
        );
        standardEntityRouting(
            this.server,
            this.server.database.config.tableNames.accounts,
            accountFields,
            accountActions.apiPaths,
            AccountModel.createEntity
        );
        standardEntityRouting(
            this.server,
            this.server.database.config.tableNames.vBookings,
            vBookingFields,
            vBookingActions.apiPaths,
            VBookingModel.createEntity
        );
        standardEntityRouting(
            this.server,
            this.server.database.config.tableNames.shortDescriptions,
            shortDescriptionFields,
            shortDescriptionActions.apiPaths,
            ShortDescriptionModel.createEntity
        );
        standardEntityRouting(
            this.server,
            this.server.database.config.tableNames.categories,
            categoryFields,
            categoryActions.apiPaths,
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
