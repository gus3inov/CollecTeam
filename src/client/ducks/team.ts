import {ActionCreator, Action} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {Record} from 'immutable';
import axios from 'axios';
import AuthService from '../services/AuthService';

const appName: string = 'collect_team';

export const moduleName = 'team';
export const LOAD_ALL_TEAMS: string = `${appName}/${moduleName}/LOAD_ALL`;
export const LOAD_TEAM: string = `${appName}/${moduleName}/LOAD_TEAM`;
export const ADD_TEAM: string = `${appName}/${moduleName}/ADD_TEAM`;
export const DELETE_TEAM: string = `${appName}/${moduleName}/DELETE_TEAM`;
export const EDIT_TEAM: string = `${appName}/${moduleName}/EDIT_TEAM`;

export const START: string = '_START';
export const SUCCESS: string = '_SUCCESS';
export const ERROR: string = '_ERROR';

export interface teamAction {
	type: any;
	payload: any;
	error: any;
}

const ReducerRecord = Record({
	entities: [],
	entitie: [],
	error: null,
	loading: false,
	loaded: false
});

const initialState = new ReducerRecord();

export default function team(state = initialState, action: teamAction): any {
	const {type, payload} = action;
	switch (type) {
		case LOAD_ALL_TEAMS + SUCCESS:
			return state
				.set('entities', payload)
				.set('loading', false);

		case LOAD_ALL_TEAMS + START:
			return state.set('loading', true);

		case LOAD_TEAM + START:
			return state.set('loading', true);

		case LOAD_TEAM + SUCCESS:
			return state
				.set('entitie', payload.data)
				.set('loading', false);

		case DELETE_TEAM:
			return state
				.deleteIn(['entities', payload.id]);

		case EDIT_TEAM:
			return state.updateIn(
				[
					'entities',
					payload.id
				],
				team => {
					team.shift(payload);
				});

		case ADD_TEAM + START:
			return state
				.set('loading', true);

		case ADD_TEAM + SUCCESS:
			return state
				.set('loading', false)
				.set('loaded', true)
				.set('entities', payload);
		default:
			return state;
	}
}

export const loadAllTeam: ActionCreator<ThunkAction<any, any, any, Action<any>>> = () => {
	return (dispatch) => {
		dispatch({
			type: LOAD_ALL_TEAMS + START
		});

		AuthService.getToken().then(token => {
			const instance = axios.create({
				timeout: 2000,
				headers: {
					'Authorization': `bearer ${token}`
				}
			});

			instance.get('/api/teams')
				.then(teams => {
					return dispatch({
						type: LOAD_ALL_TEAMS + SUCCESS,
						payload: teams.data
					});
				})
				.catch(err => {
					return dispatch({
						type: LOAD_ALL_TEAMS + ERROR,
						err
					});
				});
		});
	};
};

export const loadTeam: ActionCreator<ThunkAction<any, any, any, Action<any>>> = (name) => {
	return (dispatch) => {
		dispatch({
			type: LOAD_TEAM + START
		});
		axios.get(`/api/team/${name}`)
			.then(team => {
				console.log(team);
				return dispatch({
					type: LOAD_TEAM + SUCCESS,
					payload: team
				});
			})
			.catch(err => {
				return dispatch({
					type: LOAD_TEAM + ERROR,
					err
				});
			});
	};
};

export const addTeam: ActionCreator<ThunkAction<any, any, any, Action<any>>> = (team) => {
	return (dispatch) => {
		dispatch({
			type: ADD_TEAM + START
		});
		console.log(team);
		axios.post(`/api/team`, team)
			.then(team => {
				return dispatch({
					type: ADD_TEAM + SUCCESS
				});
			})
			.catch(err => {
				return dispatch({
					type: ADD_TEAM + ERROR,
					err
				});
			});
	};
};
