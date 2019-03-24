import {IHapiServer} from "../HapiServer";

export default class CategoriesRoutes {

    public server: IHapiServer;

    public constructor(server: IHapiServer) {
        this.server = server;
    }

    public async init() {    }
}
