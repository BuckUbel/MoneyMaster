import asyncHandler from "express-async-handler";
import { IExpressServer } from "./expressServer";
import {
  IBookingsObjectProps,
  IBookingsObjectPropsFromRequest,
  insertABooking,
  loadAllBookingsFromDB,
  updateABooking
} from "./database/model/Bookings";

export default class ServerRoutes {

  public server: IExpressServer;

  public constructor(server: IExpressServer) {
    this.server = server;
    this.init();
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
    this.server.app.post("/api/bookings/add", asyncHandler(async (req, res) => {
      const objects: IBookingsObjectPropsFromRequest[] = req.body.element;
      const rows = await insertABooking(this.server.database, objects)
        .then((result) => {
          return result;
        }).catch((error) => {
          return error;
        });
      res.json(rows);
    }));
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

    this.server.app.get("*", (req, res) => {
      res.sendFile(this.server.serverConfig.entryFile);
    });
  }
}
