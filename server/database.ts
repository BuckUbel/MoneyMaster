import mysql, {Connection, FieldInfo, MysqlError, Pool, PoolConnection, Query} from "mysql";

export interface IDBTableNames {
    bookings: string;
    vBookings: string;
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
    pool: Pool;
    store: any;
    sqlQuery: (query: string) => Promise<any[]>;
    init: () => void;
}

export class Database implements IDatabase {

    public config: IDBConfig;

    public pool: Pool;

    public store: any;

    public constructor(dbConfig: IDBConfig) {
        this.config = dbConfig;
        this.init();
    }

    public async sqlQuery(query: string): Promise<any[]> {

        if (this.pool) {

            // this.init();
            // await this.connection.connect();

            return new Promise((resolve, reject) => {
                this.pool.getConnection((error: Error, connection: PoolConnection) => {
                    if (error) {
                        return reject(error);
                    }
                    connection.query(query, (sqlError: MysqlError | null, rows?: any, fields?: FieldInfo[]) => {
                        // this.connection.end();
                        connection.release();
                        if (sqlError) {
                            return reject(error);
                        }
                        return resolve(rows);
                    });

                });
            });
        }
    }

    public init() {
        this.pool = mysql.createPool({
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
