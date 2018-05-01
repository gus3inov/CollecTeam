import Database from '../helpers/Database'
import * as config from 'config';
import StringHelper from '../helpers/StringHelper';

const tableName: object = 'users'

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
    create(): IUserRequest;

    validate(): void;

    findIdentityByAccessToken(accessToken: string): any;

    findIndentity(id: string): any;

    findByUserName(username: string): any;
}

class User extends Database implements IUserModel {

    private username: string;
    private firstName: string;
    private lastName: string;
    private password: string;
    private email: string;

    constructor({
                    username,
                    firstName,
                    lastName,
                    password,
                    email
                }: UserRequest) {
        super();
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.email = email;
    }

    public create() : Promise<any> {
        const salt = StringHelper.getRandomString(16);
        const passwordData = StringHelper.sha512(this.password, salt);

        console.log(`INSERT INTO ${tableName} 
            (first_name, last_name, email, username, password)
            VALUES(${this.firstName}, ${this.lastName}, 'fsjdflksa@list.ru', ${this.username}, ${this.password})`)

        // typeof passwordData.hash === 'string' ? console.log('string'passwordData.hash) : console.log('is not string', passwordData.hash)
        return this.query(`INSERT INTO ${tableName} 
            (first_name, last_name, email, username, password)
            VALUES('${this.firstName}', '${this.lastName}', '${this.email}', '${this.username}', '${this.password}')`)
    }

    public remove() {
        this.query()
    }

    static update() {

    }

    static getAll() {

    }

    private validate(password: string) {

    }

    static findByUserName(username: string) {

    }

    static findIndentity(id: string) {

    }

    static findIdentityByAccessToken(accessToken: string) {

    }

}

export default User;