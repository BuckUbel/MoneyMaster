"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HapiServer {
    constructor(server, database, serverConfig, bankConfig) {
        this.app = server;
        this.database = database;
        this.serverConfig = serverConfig;
        this.bankConfig = bankConfig;
        this.status = {
            bankIsRequested: false
        };
    }
}
exports.HapiServer = HapiServer;
