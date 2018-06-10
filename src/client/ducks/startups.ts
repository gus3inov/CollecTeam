import { ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { OrderedMap, Record } from 'immutable';
import * as config from 'config';
import axios from 'axios';
import {start} from 'repl';
import AuthService from '../services/AuthService';


const appName: string = 'collect_team';

export const moduleName = 'startup';
export const LOAD_ALL_STARTUPS: string = `${appName}/${moduleName}/LOAD_ALL_STARTUPS`;
export const LOAD_STARTUP: string= `${appName}/${moduleName}/LOAD_STARTUP`;
export const ADD_STARTUP: string= `${appName}/${moduleName}/ADD_STARTUP`;
export const DELETE_STARTUP: string= `${appName}/${moduleName}/DELETE_STARTUP`;
export const EDIT_STARTUP: string = `${appName}/${moduleName}/EDIT_STARTUP`;

export const START: string = '_START';
export const SUCCESS: string = '_SUCCESS';
export const ERROR: string = '_ERROR';

export interface startupAction {
    type: any;
    payload: any;
    error: any;
}

type StartupAction = startupAction;

interface IStartup {
    id: string;
    is_user: string;
    createdAt: number;
    updatedAt: number;
    description: string;
    previewPicture: string;
    detailPicture: string;
    contacts: string;
    profitText: string;
    whoNeed: string;
    specialization: string;
}

const ReducerRecord = Record({
    entities: [],
    entitie: [],
    error: null,
    loading: false
});

const initialState = new ReducerRecord();

export default function startup(state = initialState, action: startupAction): any {
    const {type, payload, error} = action;
    switch (type) {
        case LOAD_ALL_STARTUPS + SUCCESS:
            return state
                .set('entities', payload)
                .set('loading', false);

        case LOAD_ALL_STARTUPS + START:
            return state.
                    set('loading', true);

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
                    payload.id
                ],
                startup => {
                    startup.shift(payload)
                });

        case ADD_STARTUP:
            return state
                .set('loading', false)
                .set('entities', payload)
                .set('error', null);
        default:
            return state;
    }
}

export const loadAllStartups: ActionCreator<ThunkAction<any, any, void>> = () => {
    return (dispatch) => {
        dispatch({
            type: LOAD_ALL_STARTUPS + START
        });

        AuthService.getToken().then(token => {
            const instance = axios.create({
                timeout: 2000,
                headers: {
                    'Authorization': `bearer ${token}`
                }
            });

            instance.get('/api/startups')
                .then(startups => {
                    return dispatch({
                        type: LOAD_ALL_STARTUPS + SUCCESS,
                        payload: startups.data
                    });
                })
                .catch(err => {
                    return dispatch({
                        type: LOAD_ALL_STARTUPS + ERROR,
                        err
                    });
                });
        });
    };
};

export const loadStartup: ActionCreator<ThunkAction<any, any, void>> = (name) => {
    return (dispatch) => {
        dispatch({
            type: LOAD_STARTUP + START
        });
        axios.get(`/api/startup/${name}`)
            .then(startup => {
                console.log(startup)
                return dispatch({
                    type: LOAD_STARTUP + SUCCESS,
                    payload: startup
                });
            })
            .catch(err => {
                return dispatch({
                    type: LOAD_STARTUP + ERROR,
                    err
                });
            });
    };
};

export const addStartups: ActionCreator<ThunkAction<any, any, void>> = (startup) => {
    return (dispatch) => {
        dispatch({
            type: ADD_STARTUP + START
        });
        axios.post(`/api/startup`, startup)
            .then(startup => {
                return dispatch({
                    type: ADD_STARTUP + SUCCESS
                });
            })
            .catch(err => {
                return dispatch({
                    type: ADD_STARTUP + ERROR,
                    err
                });
            });
    };
};

