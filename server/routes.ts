import {
  insertABooking,
  loadAllBookingsFromDB,
} from "./database/model/Bookings";
import * as Hapi from "hapi";
import {getCSVDataFromSPKBLK} from "./puppeteer/SPK-BLK";
import {IHapiServer} from "./HapiServer";
import {extractBookingsFromFile, getLastModifiedFileInDir, IDifferentExportedBookings, readFile} from "./helper";

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
          path:  this.server.serverConfig.publicDir
        }
      }
    });
  }

  public async loadDataFromSPKBLK() {
    console.log("Start downloading CSV from SPK BLK");
    let result: IDifferentExportedBookings = {
      addBookings: [],
      editBookings: [],
    };
    try {
      await getCSVDataFromSPKBLK(this.server.serverConfig.downloadPath);
      console.log("CSV is downloaded.");
    } catch (e) {
      console.log("CSV is false downloaded.");
    }
    try {
      const file = await getLastModifiedFileInDir(this.server.serverConfig.downloadPath);
      result = await this.updateDatabaseBookings(file);
      console.log("CSV was read successfully:");
      console.log("Items to add:" + result.addBookings.length);
      console.log("Items to edit:" + result.editBookings.length);
    } catch (e) {
      console.log("CSV was not read.");
      console.log(e);
    }
    try {
      if (result.addBookings.length > 0) {
        await insertABooking(this.server.database, result.addBookings);
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

  public async updateDatabaseBookings(file: string) {
    const rows = await loadAllBookingsFromDB(this.server.database);
    const fileContent = await readFile(file, "binary");
    return extractBookingsFromFile(fileContent, rows);
    // return await updateABooking(this.server.database, result.editBookings);
  }

  public async init() {

    await this.server.app.register(require("inert"));
    this.staticFileRouting();

    this.server.app.route({
      method: "GET",
      path: "/api/bookings/load",
      handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
        const rows = loadAllBookingsFromDB(this.server.database)
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
      handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
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
      handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
        this.loadDataFromSPKBLK();
        return "Data will imported and will save in the database";
      }
    });
  }
}
