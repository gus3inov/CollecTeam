import * as MysqlPromise from 'mysql-promise';
import * as mongoose from 'mongoose';
import * as Redis from 'promise-redis';
import * as config from 'config';

export interface IConfigApp {
    db: object,
    redis: object;
}

const configApp: IConfigApp = config.get('dev')

const mysqlPromise: object = MysqlPromise();
const redis: any = Redis().createClient(configApp.redis.port, configApp.redis.host)

let mongo = mongoose;

mongo.Promise = Promise;

interface IDBConnect {
   checkMySqlConnection(): Promise<any>;

    checkRedisReadyState(): Promise<any>;

    init(): Promise<any>;
}

class DBConnect implements IDBConnect {
    private checkMySqlConnection() {
        return mysqlPromise.query('SELECT 1');
    }

    private checkRedisReadyState() {
        return new Promise((resolve, reject) => {
            redis.once('ready', () => {
                redis.removeAllListeners('error');
                redis.once('error', e => reject(e));
            })
        })
    }

    init() {
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

const init = new DBConnect().init;

export {mysqlPromise};
export {redis};
export {init};
