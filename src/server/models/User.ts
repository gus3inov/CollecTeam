import Database from '../helpers/Database';
import * as uuid from 'node-uuid';
import { genSaltSync,  hashSync } from 'bcryptjs';

const tableName: string = 'users';

export interface IUserRequest {
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
}

type UserRequest = IUserRequest

export interface IUserResponse {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    authKey: string;
    accessToken: string;
    createdAt: number;
    updatedAt: number;
}

type UserResponse = IUserResponse;

export interface IUserModel {
    create(object: UserRequest): Promise<any>;

    findIdentityByAccessToken(accessToken: string): any;

    findIndentity(id: string): any;

    findByUserName(username: string): any;

    update(username: string, user: IUserRequest): any;

    remove(username: string): any;

    generateId(): string;

    getAll(): Promise<any>;
}

class User extends Database implements IUserModel {

    /**
     * @todo Разработать четкую архитектуру класса без статического @method - create
     * */

    // private username: string;
    // private firstName: string;
    // private lastName: string;
    // private password: string;
    // private email: string;
    //
    // constructor({
    //                 username,
    //                 firstName,
    //                 lastName,
    //                 password,
    //                 email
    //             }: UserRequest) {
    //     super();
    //     this.username = username;
    //     this.firstName = firstName;
    //     this.lastName = lastName;
    //     this.password = password;
    //     this.email = email;
    // }

    constructor(){
        super();
    }

    public async create({
                            username,
                            firstName,
                            lastName,
                            password,
                            email
                        }: UserRequest): Promise<any> {
        const salt = genSaltSync();
        const hash = hashSync(password, salt);
        const uniqeId:string = this.generateID();

        return await this.query(`INSERT INTO ${tableName} 
            (id, first_name, last_name, email, username, password, salt, role)
            VALUES('${uniqeId}', '${firstName}', '${lastName}', '${email}', '${username}', '${hash}', '${salt}', 3)`);
    }

    public async remove(username: string): any {
        let result = await this.query(`DELETE FROM ${tableName} WHERE username=?`, [username]);

        return result.affectedRows;
    }

    public async update(username: string, user: IUserRequest): any {
            let UpgrageUser: IUserRequest = {},
                updateQuery: string = '';

            if (user.hasOwnProperty('username')) UpgrageUser.username = (user.username);
            if (user.hasOwnProperty('firstName')) UpgrageUser.firstName = (user.firstName);
            if (user.hasOwnProperty('lastName')) UpgrageUser.lastName = (user.lastName);
            if (user.hasOwnProperty('password')) {
                const salt = genSaltSync();
                const hash = hashSync(user.password, salt);
                UpgrageUser.salt = (salt);
                UpgrageUser.password = (hash);
            }
            if (user.hasOwnProperty('email')) UpgrageUser.email = (user.email);

            let i:number = 0;
            for(let key in UpgrageUser) {
                i++
                i === Object.keys(UpgrageUser).length ? updateQuery += `${key} = '${UpgrageUser[key]}'` : updateQuery += `${key} = '${UpgrageUser[key]}', `;
            }

            let result = await this.query(`UPDATE ${tableName} SET ${updateQuery} WHERE username=?`, [username]);
            return result.affectedRows;
    }

    private generateID(): string {
        return uuid();
    }

    public async getAll(): Promise<any> {
        return await this.query(`SELECT * from ${tableName}`);
    }

    public async findByUserName(username: string): Promise<any> {
        const user: Array<object> = await this.query(`SELECT * FROM ${tableName} WHERE username=?`, [username]);

        return user[0];
    }

    public async findIndentity(id: string): Promise<any> {
        const user: Array<object> = await this.query(`SELECT * FROM ${tableName} WHERE id=?`, [Number(id)]);

        return user[0];
    }

    /**
     * @todo Создавать ключ доступа при создании пользователял
     */

    public async findIdentityByAccessToken(accessToken: string): Promise<any> {
    }

}

export default User;