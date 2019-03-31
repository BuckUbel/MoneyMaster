"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const Hapi = __importStar(require("hapi"));
const cron_1 = require("cron");
const database_1 = require("./database");
const routes_1 = __importDefault(require("./routes"));
const HapiServer_1 = require("./HapiServer");
const path = __importStar(require("path"));
const util_1 = require("../base/helper/util");
const bookings_1 = __importDefault(require("./routes/bookings"));
// TODO SSL: https://itnext.io/node-express-letsencrypt-generate-a-free-ssl-certificate-and-run-an-https-server-in-5-minutes-a730fbe528ca
dotenv.config();
const hServer = new Hapi.Server({
    host: process.env.WEB_HOST,
    port: process.env.WEB_PORT
});
// init database
const dbConfig = {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 0),
    databaseName: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    tableNames: {
        bookings: process.env.BOOKING_TABLE_NAME,
        accounts: process.env.ACCOUNT_TABLE_NAME,
        categories: process.env.CATEGORY_TABLE_NAME,
        shortDescriptions: process.env.SHORT_DESCRIPTION_TABLE_NAME,
    }
};
const database = new database_1.Database(dbConfig);
const serverConfig = {
    prefix: process.env.WEB_URL_PREFIX,
    port: parseInt(process.env.WEB_PORT, 0),
    publicDir: path.join(__dirname, process.env.WEB_PUBLIC_DIR),
    entryFile: path.join(__dirname, process.env.WEB_PUBLIC_DIR, process.env.WEB_INDEX_HTML),
    downloadPath: path.join(__dirname, process.env.DOWNLOAD_DIR),
};
const bankConfig = {
    username: process.env.BK_USERNAME,
    password: "",
};
const server = new HapiServer_1.HapiServer(hServer, database, serverConfig, bankConfig);
const serverRoutes = new routes_1.default(server);
serverRoutes.init().then(() => {
    server.app.start().then(() => {
        console.log("Start Time : " + util_1.beautyDateTimeString(new Date()));
        console.log("Server: " + server.app.info.host + ":" + server.serverConfig.port);
    });
});
const job = new cron_1.CronJob("0 0 */6 * * *", () => {
    console.log("Cron Job to download CSV is started.");
    if (this.server.bankConfig.password !== "") {
        bookings_1.default.loadDataFromSPKBLK(this.server)
            .then(() => {
            console.log("CSV is downloaded.");
        }).catch(() => {
            console.log("CSV is false downloaded.");
        });
    }
    console.error("Password is not available");
}, () => {
    console.error("Der Cronjob endete unerwartet");
}, true);
