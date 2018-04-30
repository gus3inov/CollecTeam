import * as mongoose from 'mongoose';
import * as config from 'config';
const tableName = config.get('')

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

export interface IUserModel {
    create(): IUserRequest;
    validate(): void;
    findIdentityByAccessToken(accessToken: string): any;
    findIndentity(id: string): any;
    findByUserName(username: string): any;

}

class User implements IUserModel {
    constructor({
        username,
        firstName,
        lastName,
        password,
        email
                }: UserRequest) {

    }

    private create () {

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