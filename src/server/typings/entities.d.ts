interface IStartup {
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

interface IStartupRequest {
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

type StartupRequest = IStartupRequest;

type StartupResponse = IStartup;

interface ITeam {
	id: number;
	name: string;
	team_lead_id: string;
	specialization: string;
	logo: string;
	description: string;
}

interface ITeamRequest {
	team_lead_id: number;
	logo: string;
	name: string;
	description: string;
	specialization: string;
}

type TeamRequest = ITeamRequest;

type TeamResponse = ITeam;

interface IUser {
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

interface IUserRequest {
	username: string;
	firstName: string;
	lastName: string;
	salt: string;
	password: string;
	email: string;
}

type UserRequest = IUserRequest;

type UserResponse = IUser;
