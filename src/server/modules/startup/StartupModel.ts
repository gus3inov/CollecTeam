import Database from 'server/core/Database';
import HashMapHelper from 'server/helpers/HashMapHelper';

const tableName = 'startups';

class StartupModel extends Database implements IStartupModel {

	constructor() {
		super();
	}

	public async create({
							name,
							id_user,
							createdAt,
							updatedAt,
							description,
							contacts,
							profitText,
							whoNeed,
							specialization,
						}: StartupRequest): Promise<any> {

		return await this.query(`INSERT INTO ${tableName}
            (id_user, name, createdAt, description, contacts, profitText, whoNeed, specialization)
            VALUES(
            '${id_user}',
             '${name}',
              '${createdAt}',
                '${description}',
                 '${contacts}',
                  '${profitText}',
                   '${whoNeed}',
                    '${specialization}')`
		);
	}

	public async remove(id: string, userId: string): Promise<any> {
		const result = await this.query(`DELETE FROM ${tableName} WHERE id=? AND id_user=?`, [id, userId]);

		return result.affectedRowsstartup;
	}

	public async update(id: string, userId: string, startup: IStartupRequest): Promise<any> {
		const UpgradeStartup: any = {};

		if (startup.hasOwnProperty('name')) {
			UpgradeStartup.name = (startup.name);
		}
		if (startup.hasOwnProperty('description')) {
			UpgradeStartup.description = (startup.description);
		}
		if (startup.hasOwnProperty('contacts')) {
			UpgradeStartup.contacts = (startup.contacts);
		}
		if (startup.hasOwnProperty('profitText')) {
			UpgradeStartup.profitText = (startup.profitText);
		}
		const query: string = HashMapHelper.rowMap(UpgradeStartup, '=');

		const result = await this.query(`UPDATE ${tableName} SET ${query} WHERE id=? AND id_user=?`, [id, userId]);
		return result.affectedRows;
	}

	public async getAll(): Promise<any> {
		return await this.query(`SELECT * FROM ${tableName}`);
	}

	public async privateGetAll(userId: string): Promise<any> {
		return await this.query(`SELECT * FROM ${tableName} WHERE id_user=?`, [userId]);
	}

	public async findByStartupName(name: string): Promise<any> {
		const startup: Array<object> = await this.query(`SELECT * FROM ${tableName} WHERE name=?`, [name]);

		return startup[0];
	}

	public async findIndentity(id: string): Promise<any> {
		const startup: Array<object> = await this.query(`SELECT * FROM ${tableName} WHERE id=?`, [id]);

		return startup[0];
	}
}

export default StartupModel;
