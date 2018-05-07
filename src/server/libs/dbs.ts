import * as MysqlPromise from 'mysql-promise';
import * as mongoose from 'mongoose';
import * as config from 'config';

export interface IConfigApp {
    db: object,
    redis: object;
}

const configApp: IConfigApp = config.get('dev')

const mysqlPromise: object = new MysqlPromise();

let mongo = mongoose;

mongo.Promise = Promise;

interface IDBConnect {
    checkMySqlConnection(): Promise<any>;

    checkRedisReadyState(): Promise<any>;

    init(): Promise<any>;
}

class DBConnect {
    static mysqlConfig: any;

    constructor() {
        this.mysqlConfig = configApp.db.mysql;
    }

    private checkMySqlConnection() {
        return mysqlPromise.configure({
            "host": this.mysqlConfig.host,
            "user": this.mysqlConfig.user,
            "password": this.mysqlConfig.password,
            "database": this.mysqlConfig.database
        });

    }

   public init() {
        // console.log('init-------------------', this)
        return Promise.all([
            this.checkMySqlConnection(),
            new Promise<Promise<any>>((resolve, reject) => {
                mongoose.connect(configApp.db.mongo, err => {
                    err ? reject(err) : resolve()
                })
            })
        ])
    }
}

export {mysqlPromise};
export {DBConnect};
