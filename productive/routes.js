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
const Bookings_1 = require("./database/model/Bookings");
const SPK_BLK_1 = require("./puppeteer/SPK-BLK");
const helper_1 = require("./helper");
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
    loadDataFromSPKBLK() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = {
                addBookings: [],
                editBookings: [],
            };
            try {
                yield SPK_BLK_1.getCSVDataFromSPKBLK(this.server.serverConfig.downloadPath);
                console.log("CSV is downloaded.");
            }
            catch (e) {
                console.log("CSV is false downloaded.");
            }
            try {
                const file = yield helper_1.getLastModifiedFileInDir(this.server.serverConfig.downloadPath);
                result = yield this.updateDatabaseBookings(file);
                console.log("CSV was read successfully:");
                console.log("Items to add:" + result.addBookings.length);
                console.log("Items to edit:" + result.editBookings.length);
            }
            catch (e) {
                console.log("CSV was not read.");
                console.log(e);
            }
            try {
                if (result.addBookings.length > 0) {
                    yield Bookings_1.insertABooking(this.server.database, result.addBookings);
                }
                // if (result.editBookings.length > 0) {
                // await updateABooking(this.server.database, result.editBookings);
                // }
                console.log("Bookings are imported.");
            }
            catch (e) {
                console.log("Bookings are not imported:");
                console.log(e);
            }
        });
    }
    updateDatabaseBookings(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield Bookings_1.loadAllBookingsFromDB(this.server.database);
            const fileContent = yield helper_1.readFile(file, "binary");
            return helper_1.extractBookingsFromFile(fileContent, rows);
            // return await updateABooking(this.server.database, result.editBookings);
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.server.app.register(require("inert"));
            this.staticFileRouting();
            this.server.app.route({
                method: "GET",
                path: "/api/bookings/load",
                handler: (request, h) => {
                    const rows = Bookings_1.loadAllBookingsFromDB(this.server.database)
                        .then((result) => {
                        return result;
                    }).catch((error) => {
                        return error;
                    });
                    return rows;
                }
            });
            this.server.app.route({
                method: "POST",
                path: "/api/bookings/edit",
                handler: (request, h) => {
                    // TODO: Überarbeiten
                    /*
                    const object: IBookingsObjectProps = request.params.body;
                            console.log(object);
                            const rows = updateABooking(this.server.database, object)
                              .then((result) => {
                                return result;
                              }).catch((error) => {
                                return error;
                              });
                            return rows;
                            */
                    return null;
                }
            });
            this.server.app.route({
                method: "GET",
                path: "/api/bookings/loadFromSPK",
                handler: (request, h) => {
                    this.loadDataFromSPKBLK();
                    return "Data will imported and will save in the database";
                }
            });
        });
    }
}
exports.default = ServerRoutes;
