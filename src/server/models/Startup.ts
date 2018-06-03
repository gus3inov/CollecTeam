import Database from '../helpers/Database';

const tableName: string = 'startups';

export interface IStartupRequest {
    name: string;
    user_id: string;
    createdAt: string;
    updatedAt: string;
    description: string;
    contacts: string;
    profitText: string;
    whoNeed: string;
    specialization: string;
}

type StartupRequest = IStartupRequest

export interface IStartupResponse {
    id: number;
    id_user: string;
    createdAt: number;
    updatedAt: number;
    name: string;
    description: string;
    previewPicture: string;
    detailPicture: string;
    contacts: string;
    profitText: string;
    whoNeed: string;
    specialization: string;
}

type StartupResponse = IStartupResponse;

export interface IStartupModel {
    create(object: StartupRequest): Promise<any>;

    findIndentity(id: string): any;

    findByStartupName(username: string): any;

    update(username: string, user: IStartupRequest): any;

    remove(username: string): any;

    getAll(): Promise<any>;
}

class Startup extends Database implements IStartupModel {

    constructor(){
        super();
    }

    public async create({
                            name,
                            user_id,
                            createdAt,
                            updatedAt,
                            description,
                            contacts,
                            profitText,
                            whoNeed,
                            specialization
                        }: StartupRequest): Promise<any> {

        return await this.query(`INSERT INTO ${tableName} 
            (user_id, name, createdAt, description, contacts, profitText, whoNeed, specialization)
            VALUES('${user_id}', '${name}', '${createdAt}',  '${description}', '${contacts}', '${profitText}', '${whoNeed}', '${specialization}')`);
    }

    public async remove(id: string): any {
        let result = await this.query(`DELETE FROM ${tableName} WHERE id=?`, [id]);

        return result.affectedRowsstartup
    }
    public async update(id: string, startup: IStartupRequest): any {
        let UpgrageStartup: IStartupRequest = {},
            updateQuery: string = '';

        if (startup.hasOwnProperty('name')) UpgrageStartup.name = (startup.name);
        if (startup.hasOwnProperty('description')) UpgrageStartup.description = (startup.description);
        if (startup.hasOwnProperty('contacts')) UpgrageStartup.contacts = (startup.contacts);
        if (startup.hasOwnProperty('profitText')) UpgrageStartup.profitText = (startup.profitText);

        let i:number = 0;
        for(let key in UpgrageStartup) {
            i++;
            i === Object.keys(UpgrageStartup).length ? updateQuery += `${key} = '${UpgrageStartup[key]}'` : updateQuery += `${key} = '${UpgrageStartup[key]}', `;
        }

        let result = await this.query(`UPDATE ${tableName} SET ${updateQuery} WHERE id=?`, [id]);
        return result.affectedRows;
    }

    public async getAll(): Promise<any> {
        return await this.query(`SELECT * from ${tableName}`);
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

export default Startup;
