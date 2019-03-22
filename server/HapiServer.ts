import * as Hapi from "hapi";
import {IDatabase} from "./database";

export interface IServerConfig {
    prefix: string;
    port: number;
    publicDir: string;
    entryFile: string;
    downloadPath: string;
}

export interface IHapiServer {
    app: Hapi.Server;
    database: IDatabase;
    serverConfig: IServerConfig;
}

export class HapiServer implements IHapiServer {
    public app: Hapi.Server;
    public database: IDatabase;
    public serverConfig: IServerConfig;

    public constructor(server: Hapi.Server, database: IDatabase, serverConfig: IServerConfig) {
        this.app = server;
        this.database = database;
        this.serverConfig = serverConfig;
    }
}
