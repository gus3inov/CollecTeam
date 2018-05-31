import { ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { OrderedMap, Record } from 'immutable';
import * as config from 'config';
import axios from 'axios';
import {start} from 'repl';


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
    enitites: new OrderedMap({}),
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
                .set('loading', false)
                .set('loaded', true);

        case LOAD_ALL_STARTUPS + START:
            return state.setIn([
                'entities',
                payload.id,
                'loading'
            ], true);

        case LOAD_STARTUP + SUCCESS:
            return state.setIn(['entities', payload.id], payload.response);

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
        axios.post('/api/startups')
            .then(startups => {
                return dispatch({
                    type: LOAD_ALL_STARTUPS + SUCCESS,
                    payload: startups
                });
            })
            .catch(err => {
                return dispatch({
                    type: LOAD_ALL_STARTUPS + ERROR,
                    err
                });
            });
    };
};

export const loadStartups: ActionCreator<ThunkAction<any, any, void>> = (id) => {
    return (dispatch) => {
        dispatch({
            type: LOAD_STARTUP + START
        });
        axios.post(`/api/startup/${id}`)
            .then(startup => {
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

