import Database from '@server/core/Database';
import HashMapHelper from '@server/helpers/HashMapHelper';
import * as uuid from 'node-uuid';
import { genSaltSync,  hashSync } from 'bcryptjs';

const tableName = 'users';

class UserModel extends Database implements IUserModel {
	constructor() {
		super();
	}

	public async create({
							username,
							firstName,
							lastName,
							password,
							email,
						}: UserRequest): Promise<any> {
		const salt = genSaltSync();
		const hash = hashSync(password, salt);
		const uniqeId: string = this.generateID();

		return await this.query(`INSERT INTO ${tableName}
            (id, first_name, last_name, email, username, password, salt, role_id)
            VALUES(
            '${uniqeId}',
             '${firstName}',
              '${lastName}',
               '${email}',
                '${username}',
                 '${hash}',
                  '${salt}', 3)`);
	}

	public async remove(username: string): Promise<any> {
		const result = await this.query(`DELETE FROM ${tableName} WHERE username=?`, [username]);

		return result.affectedRows;
	}

	public async update(username: string, user: IUserRequest): Promise<any> {
		const UpgradeUser: any = {};

		if (user.hasOwnProperty('username')) {
			UpgradeUser.username = (user.username);
		}
		if (user.hasOwnProperty('firstName')) {
			UpgradeUser.firstName = (user.firstName);
		}
		if (user.hasOwnProperty('lastName')) {
			UpgradeUser.lastName = (user.lastName);
		}
		if (user.hasOwnProperty('password')) {
			const salt = genSaltSync();
			const hash = hashSync(user.password, salt);
			UpgradeUser.salt = (salt);
			UpgradeUser.password = (hash);
		}
		if (user.hasOwnProperty('email')) {
			UpgradeUser.email = (user.email);
		}
		const query: string = HashMapHelper.rowMap(UpgradeUser, '=');

		const result = await this.query(`UPDATE ${tableName} SET ${query} WHERE username=?`, [username]);
		return result.affectedRows;
	}

	public generateID(): string {
		return uuid();
	}

	public async getAll(): Promise<any> {
		return await this.query(`SELECT * from ${tableName}`);
	}

	public async findByUserName(username: string): Promise<IUser> {
		const user: Array<IUser> = await this.query(`SELECT * FROM ${tableName} WHERE username=?`, [username]);

		return user[0];
	}

	public async findIndentity(id: string): Promise<IUser> {
		const user: Array<IUser> = await this.query(`SELECT * FROM ${tableName} WHERE id=?`, [id]);

		return user[0];
	}

	/**
	 * @todo Создавать ключ доступа при создании пользователял
	 */

	// public async findIdentityByAccessToken(accessToken: string): Promise<IUser> {
	// }

}

export default UserModel;
