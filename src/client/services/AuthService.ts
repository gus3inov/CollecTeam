import axios from 'axios';

class AuthService {

    /**
     * Authenticate a user. Save a token string in Local Storage
     *
     * @param {string} token
     */
    static authenticateUser (token) {
        axios.post('/api/user/setToken', {token})
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                throw new Error(err);
            })
    }

    static async isUserAuthenticated () {
        const res = await this.getToken();

        return res !== undefined;
    }

    /**
     * Check if a user is authenticated - check if a token is saved in Local Storage
     *
     * @returns {boolean}
     */
    static getToken () {
        return axios.get('/api/user/getToken')
            .then(res => {
                return res.data.token
            })
            .catch(err => {
                throw new Error(err);
            })
    }

    /**
     * Deauthenticate a user. Remove a token from Local Storage.
     *
     */
    static async deauthenticateUser () {
        return await axios.get('/api/user/deleteToken')
            .then(res => {
                return res.token
            })
    }

}

export default AuthService;