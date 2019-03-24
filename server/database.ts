import mysql, {Connection, FieldInfo, MysqlError, Query} from "mysql";

export interface IDBTableNames {
    bookings: string;
    accounts: string;
    categories: string;
    shortDescriptions: string;
}

export interface IDBConfig {
    host: string | undefined;
    port: number | undefined;
    databaseName: string | undefined;
    user: string | undefined;
    password: string | undefined;
    tableNames: IDBTableNames;
}

export interface IDatabase {
    config: IDBConfig;
    connection: Connection;
    store: any;
    sqlQuery: (query: string) => Promise<any[]>;
    init: () => void;
}

export class Database implements IDatabase {

    public config: IDBConfig;

    public connection: Connection;

    public store: any;

    public constructor(dbConfig: IDBConfig) {
        this.config = dbConfig;
        this.init();
    }

    public async sqlQuery(query: string): Promise<any[]> {

        if (this.connection) {

            this.init();
            await this.connection.connect();

            return new Promise((resolve, reject) => {
                this.connection.query(query, (error: MysqlError | null, rows?: any, fields?: FieldInfo[]) => {
                    this.connection.end();

                    if (error) {
                        return reject(error);
                    }
                    return resolve(rows);
                });
            });
        }
    }

    public init() {
        this.connection = mysql.createConnection({
            host: this.config.host,
            port: this.config.port,
            database: this.config.databaseName,
            user: this.config.user,
            password: this.config.password,
        });
    }
}
