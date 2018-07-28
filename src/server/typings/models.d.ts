interface IUserModel {
	create(object: UserRequest): Promise<any>;

	// findIdentityByAccessToken(accessToken: string): Promise<IUser>;

	findIndentity(id: string): Promise<IUser>;

	findByUserName(username: string): Promise<IUser>;

	update(username: string, user: IUserRequest): any;

	remove(username: string): any;

	generateID(): string;

	getAll(): Promise<any>;
}

interface IStartupModel {
	create(object: StartupRequest): Promise<any>;

	findIndentity(id: string): any;

	findByStartupName(name: string): any;

	update(id: string, userId: string, startup: IStartupRequest): any;

	remove(id: string, userId: string): any;

	getAll(): Promise<any>;

	privateGetAll(userId: string): Promise<any>;
}
