import {
    insertABooking,
    loadAllBookingsFromDB,
} from "../database/model/Booking";
import * as Hapi from "hapi";
import {getCSVDataFromSPKBLK} from "../puppeteer/SPK-BLK";
import {IHapiServer} from "../HapiServer";
import {extractBookingsFromFile, getLastModifiedFileInDir, IDifferentExportedBookings, readFile} from "../helper";

export default class BookingRoutes {

    public static async loadDataFromSPKBLK(server: IHapiServer) {
        console.log("Start downloading CSV from SPK BLK");
        let result: IDifferentExportedBookings = {
            addBookings: [],
            editBookings: [],
        };
        try {
            await getCSVDataFromSPKBLK(server.serverConfig.downloadPath);
            console.log("CSV is downloaded.");
        } catch (e) {
            console.log("CSV is false downloaded.");
        }
        try {
            const file = await getLastModifiedFileInDir(server.serverConfig.downloadPath);
            result = await BookingRoutes.updateDatabaseBookings(server, file);
            console.log("CSV was read successfully:");
            console.log("Items to add:" + result.addBookings.length);
            console.log("Items to edit:" + result.editBookings.length);
        } catch (e) {
            console.log("CSV was not read.");
            console.log(e);
        }
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
            method: "GET",
            path: "/api/bookings/loadFromSPK",
            handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
                BookingRoutes.loadDataFromSPKBLK(this.server);
                return "Data will imported and will save in the database";
            }
        });
    }
}
