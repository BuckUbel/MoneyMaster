import * as dotenv from "dotenv";
import * as Hapi from "hapi";
import {CronJob} from "cron";

import {Database, IDatabase, IDBConfig} from "./database";
import ServerRoutes from "./routes";
import {getCSVDataFromSPKBLK} from "./puppeteer/SPK-BLK";
import {HapiServer, IBankConfig, IServerConfig} from "./HapiServer";
import * as path from "path";
import {beautyDateTimeString} from "../base/helper/util";
import BookingRoutes from "./routes/bookings";

// TODO SSL: https://itnext.io/node-express-letsencrypt-generate-a-free-ssl-certificate-and-run-an-https-server-in-5-minutes-a730fbe528ca

dotenv.config();

const hServer = new Hapi.Server({
    host: process.env.WEB_HOST,
    port: process.env.WEB_PORT
});

// init database
const dbConfig: IDBConfig = {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 0),
    databaseName: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    tableNames: {
        bookings: process.env.BOOKING_TABLE_NAME,
        vBookings: process.env.VBOOKING_TABLE_NAME,
        accounts: process.env.ACCOUNT_TABLE_NAME,
        categories: process.env.CATEGORY_TABLE_NAME,
        shortDescriptions: process.env.SHORT_DESCRIPTION_TABLE_NAME,
    }
};
const database: IDatabase = new Database(dbConfig);

const serverConfig: IServerConfig = {
    prefix: process.env.WEB_URL_PREFIX,
    port: parseInt(process.env.WEB_PORT, 0),
    publicDir: path.join(__dirname, process.env.WEB_PUBLIC_DIR),
    entryFile: path.join(__dirname, process.env.WEB_PUBLIC_DIR, process.env.WEB_INDEX_HTML),
    downloadPath: path.join(__dirname, process.env.DOWNLOAD_DIR),
};

const bankConfig: IBankConfig = {
    username: process.env.BK_USERNAME,
    password: "",
};
const server = new HapiServer(hServer, database, serverConfig, bankConfig);
const serverRoutes = new ServerRoutes(server);

serverRoutes.init().then(() => {
    server.app.start().then(() => {
        console.log("Start Time : " + beautyDateTimeString(new Date()));
        console.log("Server: " + server.app.info.host + ":" + server.serverConfig.port);
    });
});
