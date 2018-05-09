import {ActionCreator} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {Record} from 'immutable';
import * as config from 'config';
import axios from 'axios';

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
    error: null,
    loading: false
})

const initialState = new ReducerRecord()

export default function auth(state = initialState, action: SignUpAction): any {
    const {type, payload, error} = action;
    switch (type) {
        case SIGN_UP_REQUEST:
            return state.set('loading', true)
        case SIGN_UP_SUCCESS:
            return state
                .set('loading', false)
                .set('user', payload)
                .set('error', null)
        case SIGN_IN_SUCCESS:
            return state
                .set('loading', false)
                .set('user', payload)
                .set('error', null)
        case SIGN_UP_ERROR:
            return state
                .set('loading', false)
                .set('error', error)
        default:
            return state;
    }
}

export const signUp: ActionCreator<ThunkAction<any, any, void>> = (user) => {
    return (dispatch) => {
        dispatch({
            type: SIGN_UP_REQUEST
        })
        console.log(user)
        axios.post('/api/user', user)
            .then(user => {
                console.log(user);

                return dispatch({
                    type: SIGN_UP_SUCCESS,
                    payload: user
                })
            })
            .catch(err => {
                console.error(err);

                return dispatch({
                    type: SIGN_UP_ERROR,
                    err
                })
            })
    }
};

export const signIn: ActionCreator<ThunkAction<any, any, void>> = (user) => {
    return (dispatch) => {
        dispatch({
            type: SIGN_IN_REQUEST
        })
        console.log(user)
        axios.post('/auth/login', user)
            .then(user => {
                console.log(user);
                return dispatch({
                    type: SIGN_IN_SUCCESS,
                    payload: user
                })
            })
            .catch(err => {
                console.error(err);

                return dispatch({
                    type: SIGN_IN_ERROR,
                    err
                })
            })
    }
};
