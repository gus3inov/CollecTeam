import {ActionCreator, Action} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {Record} from 'immutable';
import axios from 'axios';
import AuthService from '../services/AuthService';

const appName: string = 'collect_team';

export const moduleName = 'auth';
export const SIGN_UP_REQUEST = `${appName}/${moduleName}/SIGN_UP_REQUEST`;
export const SIGN_UP_SUCCESS = `${appName}/${moduleName}/SIGN_UP_SUCCESS`;
export const SIGN_UP_ERROR = `${appName}/${moduleName}/SIGN_UP_ERROR`;

export const SIGN_IN_REQUEST = `${appName}/${moduleName}/SIGN_IN_REQUEST`;
export const SIGN_IN_SUCCESS = `${appName}/${moduleName}/SIGN_IN_SUCCESS`;
export const SIGN_IN_ERROR = `${appName}/${moduleName}/SIGN_IN_ERROR`;


export interface signUpAction {
	type: any;
	payload: any;
	error: any;
	isAuth?: boolean;
}

type SignUpAction = signUpAction;

interface signUp {
	username: string;
	firstName: string;
	lastName: string;
	password: string;
	email: string;
}

const ReducerRecord = Record({
	user: null,
	isAuth: false,
	error: null,
	loading: false
});

const initialState = new ReducerRecord();

export default function auth(state = initialState, action: SignUpAction): any {
	const {type, payload, error, isAuth} = action;

	switch (type) {
		case SIGN_UP_REQUEST:
			return state.set('loading', true);
		case SIGN_UP_SUCCESS:
			return state
				.set('loading', false)
				.set('user', payload[0])
				.set('error', null);
		case SIGN_IN_SUCCESS:
			return state
				.set('isAuth', isAuth)
				.set('loading', false)
				.set('user', payload)
				.set('error', null);
		case SIGN_UP_ERROR:
			return state
				.set('loading', false)
				.set('error', error);
		default:
			return state;
	}
}

export const signUp: ActionCreator<ThunkAction<any, any, any, Action<any>>> = (user) => {
	return (dispatch) => {
		dispatch({
			type: SIGN_UP_REQUEST
		});
		axios.post('/api/user', user)
			.then(user => {
				return dispatch({
					type: SIGN_UP_SUCCESS,
					payload: user
				});
			})
			.catch(err => {
				console.error(err);

				return dispatch({
					type: SIGN_UP_ERROR,
					err
				});
			});
	};
};

export const signIn: ActionCreator<ThunkAction<any, any, any, Action<any>>> = (user) => {
	return (dispatch) => {
		dispatch({
			type: SIGN_IN_REQUEST,
			isAuth: false
		});

		axios.post('/auth/login', user)
			.then(res => {
				AuthService.authenticateUser(res.data.token);
				return dispatch({
					type: SIGN_IN_SUCCESS,
					isAuth: true
				});
			})
			.catch(err => {
				// console.error(err);
				return dispatch({
					type: SIGN_IN_ERROR,
					err,
					isAuth: false
				});
			});
	};
};

export const isAuthAction: ActionCreator<ThunkAction<any, any, any, Action<any>>> = () => {
	return (dispatch: any) => {
		dispatch({
			type: SIGN_IN_REQUEST
		});

		AuthService.getToken().then(token => {
			const isAuth = token !== null;
			const instance = axios.create({
				timeout: 2000,
				headers: {
					'Authorization': `bearer ${token}`
				}
			});

			instance.get('/auth/isauth')
				.then(res => {
					return dispatch({
						type: SIGN_IN_SUCCESS,
						payload: res.data.user,
						isAuth
					});
				})
				.catch(err => {
					// console.error(err);
					return dispatch({
						type: SIGN_IN_ERROR,
						err
					});
				});
		});
	};
};
