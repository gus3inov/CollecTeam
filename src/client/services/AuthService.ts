import axios from 'axios';

class AuthService {

	/**
	 * Authenticate a user. Save a token string in Local Storage
	 *
	 * @param {string} token
	 */
	static authenticateUser(token: any) {
		axios.post('/api/user/setToken', {token})
			.then(res => {
				console.log(res);
			})
			.catch(err => {
				// console.error(err.response);
			});
	}

	static async isUserAuthenticated() {
		const res = await this.getToken();

		return res !== undefined;
	}

	/**
	 * Check if a user is authenticated - check if a token is saved in Local Storage
	 *
	 * @returns {boolean}
	 */
	static getToken() {
		return axios.get('/api/user/getToken')
			.then(res => {
				return res.data.token;
			})
			.catch(err => {
				// console.error(err.response);
			});
	}

	/**
	 * Deauthenticate a user. Remove a token from Local Storage.
	 *
	 */
	static deauthenticateUser() {
		return axios.delete('/api/user/deleteToken')
			.then((res: any) => {
				return res.token;
			})
			.catch(err => {
				console.error(err.response);
			});
	}

}

export default AuthService;
