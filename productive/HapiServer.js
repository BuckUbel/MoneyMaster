"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HapiServer {
    constructor(server, database, serverConfig) {
        this.app = server;
        this.database = database;
        this.serverConfig = serverConfig;
    }
}
exports.HapiServer = HapiServer;
