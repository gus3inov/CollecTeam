import Database from '../helpers/Database';
import StringHelper from '../helpers/StringHelper';
import * as uuid from 'node-uuid';

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

    update(id: number, user: IUserRequest): any;

    remove(id: number): any;

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
        const salt = StringHelper.getRandomString(16);
        const passwordData = StringHelper.sha512(password, salt);
        const uniqeId:string = this.generateID();

        return await this.query(`INSERT INTO ${tableName} 
            (id, first_name, last_name, email, username, password, salt, role)
            VALUES('${uniqeId}', '${firstName}', '${lastName}', '${email}', '${username}', '${passwordData.hash}', '${salt}', 3)`);
    }

    public async remove(id: number): any {
        let result = await this.query(`DELETE FROM ${tableName} WHERE id=?`, [id]);

        return result.affectedRows;
    }

    public async update(id: number, user: IUserRequest): any {
            let UpgrageUser: IUserRequest = {};

            if (user.hasOwnProperty('username')) UpgrageUser.username = (user.username);
            if (user.hasOwnProperty('firstName')) UpgrageUser.firstName = (user.firstName);
            if (user.hasOwnProperty('lastName')) UpgrageUser.lastName = (user.lastName);
            if (user.hasOwnProperty('password')) UpgrageUser.password = (user.password);
            if (user.hasOwnProperty('email')) UpgrageUser.email = (user.email);

            let result = await this.query(`UPDATE ${tableName} SET ? WHERE id=?`, [UpgrageUser, id]);

            return result.affectedRows;
    }

    private generateID(): string {
        return uuid();
    }

    public async getAll(): Promise<any> {
        return await this.query(`SELECT * from ${tableName}`);
    }

    public async findByUserName(username: string): Promise<any> {
        return await this.query(`SELECT * FROM ${tableName} WHERE username=?`, [username]);
    }

    public async findIndentity(id: string): Promise<any> {
        return await this.query(`SELECT * FROM ${tableName} WHERE id=?`, [Number(id)]);
    }

    /**
     * @todo Создавать ключ доступа при создании пользователял
     */

    public async findIdentityByAccessToken(accessToken: string): Promise<any> {
    }

}

export default User;