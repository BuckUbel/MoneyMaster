import { Express, Router } from "express";
import { IDatabase } from "./database";

export interface IDBConfig {
  host: string | undefined;
  port: number | undefined;
  databaseName: string | undefined;
  user: string | undefined;
  password: string | undefined;
}

export interface IServerConfig {
  publicDir: string;
  entryFile: string;
  downloadPath: string;
  port: number;
}

export interface IExpressServer {
  app: Express;
  database: IDatabase;
  serverConfig: IServerConfig;
  router: Router;
  store: any;
}

export class ExpressServer implements IExpressServer{
  public app: Express;
  public database: IDatabase;
  public serverConfig: IServerConfig;
  public router: Router;
  public store: any;

  public constructor(expressApp: Express, database: IDatabase, serverConfig: IServerConfig, router: Router) {
    this.app = expressApp;
    this.database = database;
    this.serverConfig = serverConfig;
    this.router = router;
  }
}
