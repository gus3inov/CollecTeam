import * as MysqlPromise from 'mysql-promise';
import * as mongoose from 'mongoose';
import * as config from 'config';

export interface IConfigApp {
	db: any,
	redis: object;
}

const configApp: IConfigApp = config.get('dev');

const mysqlPromise: any = new MysqlPromise();

const mongo = mongoose;

mongo.Promise = Promise;

interface IDBConnect {
	// checkMySqlConnection(): Promise<any>;

	// checkRedisReadyState(): Promise<any>;

	init(): Promise<any>;
}

class DBConnect implements IDBConnect {
	mysqlConfig: any;

	constructor() {
		this.mysqlConfig = configApp.db.mysql;
	}

	public init(): Promise<any> {
		return Promise.all([
			this.checkMySqlConnection(),
			new Promise<Promise<any>>((resolve, reject) => {
				mongoose.connect(configApp.db.mongo, err => {
					err ? reject(err) : resolve();
				});
			}),
		]);
	}

	private checkMySqlConnection() {
		return mysqlPromise.configure({
			'host': this.mysqlConfig.host,
			'user': this.mysqlConfig.user,
			'password': this.mysqlConfig.password,
			'database': this.mysqlConfig.database,
		});
	}
}

export { mysqlPromise };
export { DBConnect };
