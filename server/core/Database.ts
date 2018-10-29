import * as MysqlPromise from 'mysql-promise';
import * as config from 'config';

const mysql = new MysqlPromise();

/**
 * Current version typescript doesn't allowed protected method interface
 */

interface IDatabase {
	// query(sql: string, args: Array<any>): Promise<any>;
	//
	// close(): Promise<any>;
}

const configMysql = config.get('dev.db.mysql');

class Database implements IDatabase {

	constructor() {
		mysql.configure(configMysql);
	}

	protected query(sql: string, ...args: Array<any>): Promise<any> {
		return mysql.query(sql, args);
	}

	protected close(): Promise<any> {
		return new Promise((resolve, reject) => {
			mysql.end((err: any) => {
				if (err) {
					reject(err);
				}

				resolve();
			});
		});
	}
}

export default Database;
