import {IHapiServer} from "../HapiServer";

export default class AccountsRoutes {

    public server: IHapiServer;

    public constructor(server: IHapiServer) {
        this.server = server;
    }

    public async init() {

    }
}
