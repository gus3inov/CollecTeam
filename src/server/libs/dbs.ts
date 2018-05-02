import * as MysqlPromise from 'mysql-promise';
import * as mongoose from 'mongoose';
import * as Redis from 'promise-redis';
import * as config from 'config';
import err from "../middlewares/error";

export interface IConfigApp {
    db: object,
    redis: object;
}

const configApp: IConfigApp = config.get('dev')

const mysqlPromise: object = new MysqlPromise();
const redis: any = Redis().createClient(configApp.redis.port, configApp.redis.host)

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

    private checkRedisReadyState() {
        return new Promise((resolve, reject) => {
            redis.once('ready', () => {
                redis.removeAllListeners('error');
                redis.once('error', e => reject(e));
            })
        })
    }

   public init() {
        // console.log('init-------------------', this)
        return Promise.all([
            this.checkMySqlConnection(),
            new Promise<Promise<any>>((resolve, reject) => {
                mongoose.connect(configApp.db.mongo, err => {
                    err ? reject(err) : resolve()
                })
            }),
            this.checkRedisReadyState()
        ])
    }
}

export {mysqlPromise};
export {redis};
export {DBConnect};
