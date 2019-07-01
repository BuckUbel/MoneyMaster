"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bookings_1 = __importDefault(require("./routes/bookings"));
const AccountModel_1 = require("../base/model/AccountModel");
const BookingModel_1 = require("../base/model/BookingModel");
const ShortDescriptionModel_1 = require("../base/model/ShortDescriptionModel");
const CategoryModel_1 = require("../base/model/CategoryModel");
const enities_1 = require("./routes/enities");
const VBookingModel_1 = require("../base/model/VBookingModel");
class ServerRoutes {
    constructor(server) {
        this.server = server;
    }
    staticFileRouting() {
        this.server.app.route({
            method: "GET",
            path: "/{any*}",
            handler: (request, h) => {
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
    restAPIRouting() {
        enities_1.standardEntityRouting(this.server, this.server.database.config.tableNames.bookings, BookingModel_1.bookingFields, BookingModel_1.bookingActions.apiPaths, BookingModel_1.BookingModel.createEntity);
        enities_1.standardEntityRouting(this.server, this.server.database.config.tableNames.accounts, AccountModel_1.accountFields, AccountModel_1.accountActions.apiPaths, AccountModel_1.AccountModel.createEntity);
        enities_1.standardEntityRouting(this.server, this.server.database.config.tableNames.vBookings, VBookingModel_1.vBookingFields, VBookingModel_1.vBookingActions.apiPaths, VBookingModel_1.VBookingModel.createEntity);
        enities_1.standardEntityRouting(this.server, this.server.database.config.tableNames.shortDescriptions, ShortDescriptionModel_1.shortDescriptionFields, ShortDescriptionModel_1.shortDescriptionActions.apiPaths, ShortDescriptionModel_1.ShortDescriptionModel.createEntity);
        enities_1.standardEntityRouting(this.server, this.server.database.config.tableNames.categories, CategoryModel_1.categoryFields, CategoryModel_1.categoryActions.apiPaths, CategoryModel_1.CategoryModel.createEntity);
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.server.app.register(require("inert"));
            this.staticFileRouting();
            this.restAPIRouting();
            const bookingRoutes = new bookings_1.default(this.server);
            yield bookingRoutes.init();
        });
    }
}
exports.default = ServerRoutes;
