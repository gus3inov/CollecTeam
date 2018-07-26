import Database from '../helpers/Database';

const tableName: string = 'teams';

export interface ITeamRequest {

}

type TeamRequest = ITeamRequest

export interface ITeamResponse {

}

type TeamResponse = ITeamResponse;

export interface ITeamModel {
    create(object: TeamRequest): Promise<any>;

    findIndentity(id: string): any;

    findByTeamName(name: string): any;

    update(id: string, team: ITeamRequest): any;

    remove(name: string): any;

    getAll(): Promise<any>;
}

class Team extends Database implements ITeamModel {

    constructor(){
        super();
    }

    public async create({
                            team_lead_id,
                            logo,
                            name,
                            description,
                            specialization
                        }: TeamRequest): Promise<any> {

        return await this.query(`INSERT INTO ${tableName} 
            (team_lead_id, name, logo, description, specialization)
            VALUES('${team_lead_id}', '${name}', '${logo}', '${description}', '${specialization}')`);
    }

    public async remove(id: string): any {
        let result = await this.query(`DELETE FROM ${tableName} WHERE id=?`, [id]);

        return result.affectedRowsstartup
    }

    public async update(id: string, startup: ITeamRequest): any {
        let UpgrageTeam: ITeamRequest = {},
            updateQuery: string = '';

        if (startup.hasOwnProperty('specialization')) UpgrageTeam.specialization = (startup.specialization);
        if (startup.hasOwnProperty('name')) UpgrageTeam.name = (startup.name);
        if (startup.hasOwnProperty('description')) UpgrageTeam.description = (startup.description);
        if (startup.hasOwnProperty('logo')) UpgrageTeam.logo = (startup.logo);

        let i:number = 0;
        for(let key in UpgrageTeam) {
            i++;
            i === Object.keys(UpgrageTeam).length ? updateQuery += `${key} = '${UpgrageTeam[key]}'` : updateQuery += `${key} = '${UpgrageTeam[key]}', `;
        }

        let result = await this.query(`UPDATE ${tableName} SET ${updateQuery} WHERE id=?`, [id]);
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
