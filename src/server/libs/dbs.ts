import * as MysqlPromise from 'mysql-promise';
import * as config from 'config';

export interface IConfigApp {
	db: any;
	redis: object;
}

const configApp: IConfigApp = config.get('dev');

const mysqlPromise: any = new MysqlPromise();

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
		return Promise.resolve(this.checkMySqlConnection());
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
