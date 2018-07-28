import Database from '@core/Database';
import HashMapHelper from '@server/helpers/HashMapHelper';

const tableName = 'teams';

export interface ITeamModel {
	create(object: TeamRequest): Promise<any>;

	findIndentity(id: string): any;

	findByTeamName(name: string): any;

	update(id: string, team: ITeamRequest): any;

	remove(name: string): any;

	getAll(): Promise<any>;
}

class Team extends Database implements ITeamModel {

	constructor() {
		super();
	}

	public async create({
							team_lead_id,
							logo,
							name,
							description,
							specialization,
						}: TeamRequest): Promise<any> {

		return await this.query(`INSERT INTO ${tableName}
            (team_lead_id, name, logo, description, specialization)
            VALUES(
            '${team_lead_id}',
             '${name}',
              '${logo}',
               '${description}',
                '${specialization}')`);
	}

	public async remove(id: string): Promise<any> {
		const result = await this.query(`DELETE FROM ${tableName} WHERE id=?`, [id]);

		return result.affectedRowsstartup;
	}

	public async update(id: string, startup: ITeamRequest): Promise<any> {
		const UpgradeTeam: any = {};

		if (startup.hasOwnProperty('specialization')) {
			UpgradeTeam.specialization = (startup.specialization);
		}
		if (startup.hasOwnProperty('name')) {
			UpgradeTeam.name = (startup.name);
		}
		if (startup.hasOwnProperty('description')) {
			UpgradeTeam.description = (startup.description);
		}
		if (startup.hasOwnProperty('logo')) {
			UpgradeTeam.logo = (startup.logo);
		}
		const query = HashMapHelper.rowMap(UpgradeTeam, '=');

		const result = await this.query(`UPDATE ${tableName} SET ${query} WHERE id=?`, [id]);
		return result.affectedRows;
	}

	public async getAll(): Promise<any> {
		return await this.query(`SELECT * FROM ${tableName}`);
	}

	public async findByTeamName(name: string): Promise<any> {
		const startup: Array<object> = await this.query(`SELECT * FROM ${tableName} WHERE name=?`, [name]);

		return startup[0];
	}

	public async findIndentity(id: string): Promise<any> {
		const startup: Array<object> = await this.query(`SELECT * FROM ${tableName} WHERE id=?`, [id]);

		return startup[0];
	}
}

export default Team;
