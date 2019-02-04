import asyncHandler from "express-async-handler";
import { IExpressServer } from "./expressServer";
import {loadAllBookingsFromDB} from "./database/model/Bookings";

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
    this.server.app.get("*", (req, res) => {
      res.sendFile(this.server.serverConfig.entryFile);
    });
  }
}
