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
const SPK_BLK_1 = require("./puppeteer/SPK-BLK");
const HapiServer_1 = require("./HapiServer");
const path = __importStar(require("path"));
const util_1 = require("../base/helper/util");
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
};
const database = new database_1.Database(dbConfig);
const serverConfig = {
    prefix: process.env.WEB_URL_PREFIX,
    port: parseInt(process.env.WEB_PORT, 0),
    publicDir: path.join(__dirname, process.env.WEB_PUBLIC_DIR),
    entryFile: path.join(__dirname, process.env.WEB_PUBLIC_DIR, process.env.WEB_INDEX_HTML),
    downloadPath: path.join(__dirname, process.env.DOWNLOAD_DIR),
};
const server = new HapiServer_1.HapiServer(hServer, database, serverConfig);
const serverRoutes = new routes_1.default(server);
serverRoutes.init().then(() => {
    server.app.start().then(() => {
        console.log("Start Time : " + util_1.beautyDateTimeString(new Date()));
        console.log("Server: " + server.app.info.host + ":" + server.serverConfig.port);
    });
});
const job = new cron_1.CronJob("0 0 */6 * * *", () => {
    console.log("Cron Job to download CSV is started.");
    SPK_BLK_1.getCSVDataFromSPKBLK(server.serverConfig.downloadPath).then(() => {
        console.log("CSV is downloaded.");
    }).catch(() => {
        console.log("CSV is false downloaded.");
    });
}, () => {
    console.error("Der Cronjob endete unerwartet");
}, true);
