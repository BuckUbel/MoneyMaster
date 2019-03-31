import * as Hapi from "hapi";
import {IDatabase} from "./database";

export interface IBankConfig {
    username: string;
    password?: string;
}

export interface IServerConfig {
    prefix: string;
    port: number;
    publicDir: string;
    entryFile: string;
    downloadPath: string;
}

export interface IServerStatus {
    bankIsRequested: boolean;
}

export interface IHapiServer {
    app: Hapi.Server;
    database: IDatabase;
    serverConfig: IServerConfig;
    bankConfig: IBankConfig;
    status: IServerStatus;
}

export class HapiServer implements IHapiServer {
    public app: Hapi.Server;
    public database: IDatabase;
    public serverConfig: IServerConfig;
    public bankConfig: IBankConfig;
    public status: IServerStatus;

    public constructor(server: Hapi.Server, database: IDatabase, serverConfig: IServerConfig, bankConfig: IBankConfig) {
        this.app = server;
        this.database = database;
        this.serverConfig = serverConfig;
        this.bankConfig = bankConfig;
        this.status = {
            bankIsRequested: false
        };
    }
}
