import * as dotenv from "dotenv";
import express from "express";
import path from "path";
import bodyParser from "body-parser";

import {ExpressServer, IDBConfig, IServerConfig} from "./expressServer";
import {Database, IDatabase} from "./database";
import ServerRoutes from "./routes";
import {beautyDateTimeString} from "./util";

dotenv.config();

// configure the app
const app = express();
const router = express.Router();

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
  publicDir: path.join(__dirname, process.env.WEB_PUBLIC_DIR),
  entryFile: path.join(__dirname, process.env.WEB_PUBLIC_DIR, process.env.WEB_INDEX_HTML),
  port: parseInt(process.env.WEB_PORT, 0),
};

const server = new ExpressServer(app, database, serverConfig, router);
app.use(bodyParser.urlencoded({limit: "50mb", extended: true}));
app.use(bodyParser.json({limit: "50mb"}));
// add JS, CSS
app.use(express.static(server.serverConfig.publicDir));

// use routes
const serverRoutes = new ServerRoutes(server);

app.listen(server.serverConfig.port, () => {
  console.log("Start Time : " + beautyDateTimeString(new Date()));
  console.log("App is listening on : " + server.serverConfig.port);
});
