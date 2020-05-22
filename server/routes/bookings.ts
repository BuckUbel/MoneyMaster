import {
    insertABooking,
    loadAllBookingsFromDB,
} from "../database/model/Booking";
import * as Hapi from "hapi";
import {IHapiServer} from "../HapiServer";
import {
    extractBookingsFromFile,
    getLastModifiedFileInDir,
    IDifferentExportedBookings,
    readFile
} from "../helper";
import {Message} from "../../base/helper/messages/Message";
import {ErrorMessage} from "../../base/helper/messages/ErrorMessage";

export default class BookingRoutes {

    public static async loadDataFromSPKBLK(server: IHapiServer) {
        let abort = false;
        if (!server.status.bankIsRequested) {
            server.status.bankIsRequested = true;
            console.log("Start downloading CSV from SPK BLK");
            let result: IDifferentExportedBookings = {
                addBookings: [],
                editBookings: [],
            };
            if (!abort) {

                try {
                    // await getCSVDataFromSPKBLK(server.serverConfig.downloadPath, server.bankConfig);
                    console.log("CSV is downloaded.");
                } catch (e) {
                    abort = true;
                    console.log("CSV is false downloaded.");
                    console.error(e);
                }
            }
            if (!abort) {
                try {
                    const file = await getLastModifiedFileInDir(server.serverConfig.downloadPath);
                    result = await BookingRoutes.updateDatabaseBookings(server, file);
                    console.log("CSV was read successfully:");
                    console.log("Items to add:" + result.addBookings.length);
                    console.log("Items to edit:" + result.editBookings.length);
                } catch (e) {
                    abort = true;
                    console.log("CSV was not read.");
                    console.log(e);
                }
            }
            if (!abort) {
                try {
                    if (result.addBookings.length > 0) {
                        await insertABooking(server.database, result.addBookings);
                    }
                    // if (result.editBookings.length > 0) {
                    // await updateABooking(this.server.database, result.editBookings);
                    // }
                    console.log("Bookings are imported.");
                } catch (e) {
                    console.log("Bookings are not imported:");
                    console.log(e);
                }
            }
            server.status.bankIsRequested = false;
        } else {
            console.log("Bank is already being requested.");
        }
    }

    public static async updateDatabaseBookings(server: IHapiServer, file: string) {
        const rows = await loadAllBookingsFromDB(server.database);
        const fileContent = await readFile(file, "binary");
        return extractBookingsFromFile(fileContent, rows);
        // return await updateABooking(this.server.database, result.editBookings);
    }

    public server: IHapiServer;

    public constructor(server: IHapiServer) {
        this.server = server;
    }

    public async init() {

        this.server.app.route({
            method: "POST",
            path: "/api/bookings/loadFromSPK",
            handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
                const requestBody: any = request.payload;
                if (requestBody.pwd && requestBody.pwd !== "") {
                    try {
                        console.log("Start testing password for SPK BLK");
                        // await testPasswordForSPKBLK(requestBody.pwd, this.server.bankConfig);
                        this.server.bankConfig.password = requestBody.pwd;
                    } catch (e) {
                        return new ErrorMessage("False Password");
                    }
                }
                if (this.server.bankConfig.password !== "") {
                    if (!this.server.status.bankIsRequested) {
                        try {
                            BookingRoutes.loadDataFromSPKBLK(this.server);
                            return new Message("Data will imported and will save in the database");
                        } catch (error) {
                            console.error(error);
                            return new ErrorMessage("Error on loading Data.", error);
                        }
                    }
                    return new ErrorMessage("Bank is already being requested.");
                }
                return new ErrorMessage("No password is available.");
            }
        });
    }
}
