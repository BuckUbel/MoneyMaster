import * as dotenv from "dotenv";
import * as Hapi from "hapi";
import {CronJob} from "cron";

import {Database, IDatabase, IDBConfig} from "./database";
import ServerRoutes from "./routes";
import {getCSVDataFromSPKBLK} from "./puppeteer/SPK-BLK";
import {HapiServer, IServerConfig} from "./HapiServer";
import * as path from "path";
import {beautyDateTimeString} from "../base/helper/util";

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
};
const database: IDatabase = new Database(dbConfig);

const serverConfig: IServerConfig = {
  prefix: process.env.WEB_URL_PREFIX,
  port: parseInt(process.env.WEB_PORT, 0),
  publicDir: path.join(__dirname, process.env.WEB_PUBLIC_DIR),
  entryFile: path.join(__dirname, process.env.WEB_PUBLIC_DIR, process.env.WEB_INDEX_HTML),
  downloadPath: path.join(__dirname, process.env.DOWNLOAD_DIR),
};

const server = new HapiServer(hServer, database, serverConfig);
const serverRoutes = new ServerRoutes(server);

serverRoutes.init().then(() => {
  server.app.start().then(() => {
    console.log("Start Time : " + beautyDateTimeString(new Date()));
    console.log("Server: " + server.app.info.host + ":" + server.serverConfig.port);
  });
});

const job = new CronJob("0 0 */6 * * *", () => {
    console.log("Cron Job to download CSV is started.");
    getCSVDataFromSPKBLK(server.serverConfig.downloadPath).then(() => {
      console.log("CSV is downloaded.");
    }).catch(() => {
      console.log("CSV is false downloaded.");
    });
  }, () => {
    console.error("Der Cronjob endete unerwartet");
  },
  true
);
