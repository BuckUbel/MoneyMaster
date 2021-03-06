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
const Booking_1 = require("../database/model/Booking");
const SPK_BLK_1 = require("../puppeteer/SPK-BLK");
const helper_1 = require("../helper");
const Message_1 = require("../../base/helper/messages/Message");
const ErrorMessage_1 = require("../../base/helper/messages/ErrorMessage");
class BookingRoutes {
    static loadDataFromSPKBLK(server) {
        return __awaiter(this, void 0, void 0, function* () {
            let abort = false;
            if (!server.status.bankIsRequested) {
                server.status.bankIsRequested = true;
                console.log("Start downloading CSV from SPK BLK");
                let result = {
                    addBookings: [],
                    editBookings: [],
                };
                if (!abort) {
                    try {
                        yield SPK_BLK_1.getCSVDataFromSPKBLK(server.serverConfig.downloadPath, server.bankConfig);
                        console.log("CSV is downloaded.");
                    }
                    catch (e) {
                        abort = true;
                        console.log("CSV is false downloaded.");
                        console.error(e);
                    }
                }
                if (!abort) {
                    try {
                        const file = yield helper_1.getLastModifiedFileInDir(server.serverConfig.downloadPath);
                        result = yield BookingRoutes.updateDatabaseBookings(server, file);
                        console.log("CSV was read successfully:");
                        console.log("Items to add:" + result.addBookings.length);
                        console.log("Items to edit:" + result.editBookings.length);
                    }
                    catch (e) {
                        abort = true;
                        console.log("CSV was not read.");
                        console.log(e);
                    }
                }
                if (!abort) {
                    try {
                        if (result.addBookings.length > 0) {
                            yield Booking_1.insertABooking(server.database, result.addBookings);
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
                }
                server.status.bankIsRequested = false;
            }
            else {
                console.log("Bank is already being requested.");
            }
        });
    }
    static updateDatabaseBookings(server, file) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield Booking_1.loadAllBookingsFromDB(server.database);
            const fileContent = yield helper_1.readFile(file, "binary");
            return helper_1.extractBookingsFromFile(fileContent, rows);
            // return await updateABooking(this.server.database, result.editBookings);
        });
    }
    constructor(server) {
        this.server = server;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.server.app.route({
                method: "POST",
                path: "/api/bookings/loadFromSPK",
                handler: (request, h) => __awaiter(this, void 0, void 0, function* () {
                    const requestBody = request.payload;
                    if (requestBody.pwd && requestBody.pwd !== "") {
                        try {
                            console.log("Start testing password for SPK BLK");
                            yield SPK_BLK_1.testPasswordForSPKBLK(requestBody.pwd, this.server.bankConfig);
                            this.server.bankConfig.password = requestBody.pwd;
                        }
                        catch (e) {
                            return new ErrorMessage_1.ErrorMessage("False Password");
                        }
                    }
                    if (this.server.bankConfig.password !== "") {
                        if (!this.server.status.bankIsRequested) {
                            try {
                                BookingRoutes.loadDataFromSPKBLK(this.server);
                                return new Message_1.Message("Data will imported and will save in the database");
                            }
                            catch (error) {
                                console.error(error);
                                return new ErrorMessage_1.ErrorMessage("Error on loading Data.", error);
                            }
                        }
                        return new ErrorMessage_1.ErrorMessage("Bank is already being requested.");
                    }
                    return new ErrorMessage_1.ErrorMessage("No password is available.");
                })
            });
        });
    }
}
exports.default = BookingRoutes;
