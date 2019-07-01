"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
class Database {
    constructor(dbConfig) {
        this.config = dbConfig;
        this.init();
    }
    sqlQuery(query) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.pool) {
                // this.init();
                // await this.connection.connect();
                return new Promise((resolve, reject) => {
                    this.pool.getConnection((error, connection) => {
                        if (error) {
                            return reject(error);
                        }
                        connection.query(query, (sqlError, rows, fields) => {
                            // this.connection.end();
                            connection.release();
                            if (sqlError) {
                                return reject(sqlError);
                            }
                            return resolve(rows);
                        });
                    });
                });
            }
        });
    }
    init() {
        this.pool = mysql_1.default.createPool({
            host: this.config.host,
            port: this.config.port,
            database: this.config.databaseName,
            user: this.config.user,
            password: this.config.password,
            multipleStatements: true,
            connectionLimit: 20
        });
    }
}
exports.Database = Database;
