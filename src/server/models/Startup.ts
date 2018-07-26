import Database from '../helpers/Database';

const tableName: string = 'startups';

export interface IStartupRequest {
    name: string;
    id_user: string;
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

    findByStartupName(name: string): any;

    update(id: string, userId: string, startup: IStartupRequest): any;

    remove(id: string, userId: string): any;

    getAll(): Promise<any>;

    privateGetAll(userId: string): Promise<any>;
}

class Startup extends Database implements IStartupModel {

    constructor(){
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
                            specialization
                        }: StartupRequest): Promise<any> {

        return await this.query(`INSERT INTO ${tableName} 
            (id_user, name, createdAt, description, contacts, profitText, whoNeed, specialization)
            VALUES('${id_user}', '${name}', '${createdAt}',  '${description}', '${contacts}', '${profitText}', '${whoNeed}', '${specialization}')`);
    }

    public async remove(id: string, userId): any {
        let result = await this.query(`DELETE FROM ${tableName} WHERE id=? AND id_user=?`, [id, userId]);

        return result.affectedRowsstartup
    }
    public async update(id: string, userId, startup: IStartupRequest): any {
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

        let result = await this.query(`UPDATE ${tableName} SET ${updateQuery} WHERE id=? AND id_user=?`, [id, userId]);
        return result.affectedRows;
    }

    public async getAll(): Promise<any> {
        return await this.query(`SELECT * FROM ${tableName}`);
    }

    public async privateGetAll(userId): Promise<any> {
        return await this.query(`SELECT * FROM ${tableName} WHERE id_user=?`,[userId]);
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
