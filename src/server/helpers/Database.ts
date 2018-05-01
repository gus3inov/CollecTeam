import * as MysqlPromise from 'mysql-promise';
import * as config from 'config';

const mysql: object = new MysqlPromise();

interface IDatabase {
    query(sql: string): Promise<any>;

    close(): Promise<any>;
}

const configMysql = config.get('dev.db.mysql');

class Database implements IDatabase {

    private connection: any;

    constructor() {
        this.connection = mysql.configure(configMysql);
    }

    protected query(sql: string): Promise<any> {
        return mysql.query(sql);
    }

    protected close(): Promise<any> {
        return new Promise((resolve, reject) => {
            mysql.end(err => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    }
}

export default Database;