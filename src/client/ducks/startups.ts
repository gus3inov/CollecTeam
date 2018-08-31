import {ActionCreator, Action} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {Record} from 'immutable';
import axios from 'axios';
import AuthService from '../services/AuthService';

const appName = 'collect_team';

export const moduleName = 'startup';
export const LOAD_ALL_STARTUPS = `${appName}/${moduleName}/LOAD_ALL_STARTUPS`;
export const LOAD_STARTUP = `${appName}/${moduleName}/LOAD_STARTUP`;
export const ADD_STARTUP = `${appName}/${moduleName}/ADD_STARTUP`;
export const DELETE_STARTUP = `${appName}/${moduleName}/DELETE_STARTUP`;
export const EDIT_STARTUP = `${appName}/${moduleName}/EDIT_STARTUP`;

export const START = '_START';
export const SUCCESS = '_SUCCESS';
export const ERROR = '_ERROR';

export interface IStartupAction {
	type: any;
	payload: any;
	error: any;
}

const ReducerRecord = Record({
	entities: [],
	entitie: [],
	error: null,
	loading: false,
	loaded: false,
});

const initialState = new ReducerRecord();

export default function startupReducer(state: any = initialState, action: IStartupAction): any {
	const {type, payload} = action;
	switch (type) {
		case LOAD_ALL_STARTUPS + SUCCESS:
			return state
				.set('entities', payload)
				.set('loading', false);

		case LOAD_ALL_STARTUPS + START:
			return state.set('loading', true);

		case LOAD_STARTUP + START:
			return state.set('loading', true);

		case LOAD_STARTUP + SUCCESS:
			return state
				.set('entitie', payload.data)
				.set('loading', false);

		case DELETE_STARTUP:
			return state
				.deleteIn(['entities', payload.id]);

		case EDIT_STARTUP:
			return state.updateIn(
				[
					'entities',
					payload.id,
				],
				(startup: any) => {
					startup.shift(payload);
				});

		case ADD_STARTUP + START:
			return state
				.set('loading', true);

		case ADD_STARTUP + SUCCESS:
			return state
				.set('loading', false)
				.set('loaded', true)
				.set('entities', payload);
		default:
			return state;
	}
}

export const loadAllStartups: ActionCreator<ThunkAction<any, any, any, Action<any>>> = () => {
	return (dispatch) => {
		dispatch({
			type: LOAD_ALL_STARTUPS + START,
		});

		AuthService.getToken().then(token => {
			const instance = axios.create({
				timeout: 2000,
				headers: {
					'Authorization': `bearer ${token}`,
				},
			});

			instance.get('/api/startups')
				.then(startups => {
					return dispatch({
						type: LOAD_ALL_STARTUPS + SUCCESS,
						payload: startups.data,
					});
				})
				.catch(err => {
					return dispatch({
						type: LOAD_ALL_STARTUPS + ERROR,
						err,
					});
				});
		});
	};
};

export const loadStartup: ActionCreator<ThunkAction<any, any, any, Action<any>>> = (name) => {
	return (dispatch) => {
		dispatch({
			type: LOAD_STARTUP + START,
		});
		axios.get(`/api/startup/${name}`)
			.then(res => {
				return dispatch({
					type: LOAD_STARTUP + SUCCESS,
					payload: res,
				});
			})
			.catch(err => {
				return dispatch({
					type: LOAD_STARTUP + ERROR,
					err,
				});
			});
	};
};

export const addStartup: ActionCreator<ThunkAction<any, any, any, Action<any>>> = (startup) => {
	return (dispatch) => {
		dispatch({
			type: ADD_STARTUP + START,
		});

		axios.post(`/api/startup`, startup)
			.then(res => {
				return dispatch({
					type: ADD_STARTUP + SUCCESS,
					payload: res,
				});
			})
			.catch(err => {
				return dispatch({
					type: ADD_STARTUP + ERROR,
					err,
				});
			});
	};
};
