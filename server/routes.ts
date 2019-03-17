import asyncHandler from "express-async-handler";
import {IExpressServer} from "./expressServer";
import {
  IBookingsObjectProps,
  IBookingsObjectPropsFromRequest,
  insertABooking,
  loadAllBookingsFromDB,
  updateABooking
} from "./database/model/Bookings";
import {getCSVDataFromSPKBLK} from "./puppeteer/SPK-BLK";
import fs, {Stats} from "fs";
import {promisify} from "util";
import {arrayToBookingModel, BookingModel} from "./database/model/BookingModel";

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);

interface IFileStats {
  stats: Stats;
  path: string;
}

async function getLastModifiedFileInDir(dir: string) {
  const filePathList = await readdir(dir);
  const fileObjectList: Stats[] = await Promise.all(filePathList.map(async (file: string) => {
    const path = dir + "/" + file;
    return await stat(path);
  }));

  const fileObjectListWithPaths: IFileStats[] = filePathList.map((filePath: string, index: number): IFileStats => {
    return {
      stats: fileObjectList[index],
      path: dir + "/" + filePath,
    };
  });

  fileObjectListWithPaths.sort((a: IFileStats, b: IFileStats): number => {
    return b.stats.ctimeMs - a.stats.ctimeMs;
  });

  return fileObjectListWithPaths[0].path;
}

export function getStringValues(element: string, separator: string): string[] {
  return element.split(separator).map((p: string): string => {
    return p ? p.replace(/[\"]/gi, "") : "";
  });
}

interface IDifferentExportedBookings {
  addBookings: BookingModel[];
  editBookings: BookingModel[];
}

function extractBookingsFromFile(fileContent: string, bookings: BookingModel[]): IDifferentExportedBookings {
  const elements: string[] = fileContent.split("\n");
  elements.pop();
  const categories = getStringValues(elements[0], ";");
  elements.shift();

  const newBookings = elements.map((el: string): BookingModel => {
    return arrayToBookingModel(getStringValues(el, ";"), categories);
  });

  const updateBookings: BookingModel[] = [];
  const reallyNewBookings = newBookings.filter((newBooking) => {

    return bookings.every((oldBooking: BookingModel) => {
      const bookingStatus = newBooking.equals(oldBooking);
      if (bookingStatus === "ignore") {
        return false;
      }
      if (bookingStatus === "update") {
        updateBookings.push(newBooking);
        return false;
      }
      return true;
    });
  });
  return {
    addBookings: reallyNewBookings,
    editBookings: updateBookings
  };
  // this.setState({upload: reallyNewBookings});
}

export default class ServerRoutes {

  public server: IExpressServer;

  public constructor(server: IExpressServer) {
    this.server = server;
    this.init();
  }

  public async updateDatabaseBookings(file: string) {
    const rows = await loadAllBookingsFromDB(this.server.database);
    const fileContent = await readFile(file, "binary");
    return extractBookingsFromFile(fileContent, rows);
    // return await updateABooking(this.server.database, result.editBookings);

  }

  public init() {
    this.server.app.get("/api/bookings/load", asyncHandler(async (req, res) => {
      const rows = await loadAllBookingsFromDB(this.server.database)
        .then((result) => {
          return result;
        }).catch((error) => {
          return error;
        });
      res.json(rows);
    }));
    // this.server.app.post("/api/bookings/add", asyncHandler(async (req, res) => {
    //   const objects: IBookingsObjectPropsFromRequest[] = req.body.element;
    //   const rows = await insertABooking(this.server.database, objects)
    //     .then((result) => {
    //       return result;
    //     }).catch((error) => {
    //       return error;
    //     });
    //   res.json(rows);
    // }));
    this.server.app.post("/api/bookings/edit", asyncHandler(async (req, res) => {
      const object: IBookingsObjectProps = req.body;
      console.log(object);
      const rows = await updateABooking(this.server.database, object)
        .then((result) => {
          return result;
        }).catch((error) => {
          return error;
        });
      res.json(rows);
    }));

    this.server.app.get("/api/bookings/loadFromSPK", asyncHandler(async (req, res) => {
        res.send("Data will imported and will save in the database");

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
          await insertABooking(this.server.database, result.addBookings);
          // await updateABooking(this.server.database, result.editBookings);

          console.log("Bookings are imported.");
        } catch (e) {
          console.log("Bookings are not imported:");
          console.log(e);
        }
      }
    ));
    this.server.app.get("*", (req, res) => {
      res.sendFile(this.server.serverConfig.entryFile);
    });
  }
}
