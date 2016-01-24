import * as Actions from './index';
import { configRequest, configLoad } from './ConfigAction';
import * as fetch from 'isomorphic-fetch';
import { userLoaded } from './AppAction';
import { storeToken, loginRequest } from './LoginAction';
import { LocalStorage, defaultRequestOptions } from '../constants';
import * as _  from 'lodash';

export function restoreToken() {
    return (dispatch) => {
        const token = localStorage.getItem(LocalStorage.token);

        if (token) {
            dispatch(storeToken(token));
        }
    }
}

export function loadDefaultUser() {
    return (dispatch, getState) => {

        const options = defaultRequestOptions(getState().auth.token, 'GET');

        return fetch(`${getState().app.config.apiBaseUrl}/user`, options)
            .then( response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error('Could not load current user');
                }
            })
            .then( data => _.get(data, '.data[0]'))
            .then( user => {
                if (typeof _.get(user, '._id') === 'string') {
                    dispatch(userLoaded(user));
                } else {
                    throw new Error('Invalid response for current user request');
                }
            })
            .catch( err => console.log(err))
    }
}

export function bootstrap() {
    return (dispatch, getState) => {
        dispatch(restoreToken());
        dispatch(configLoad()).then( () =>  {
            if (getState().auth.token) {
                dispatch(loginRequest());
                dispatch(loadDefaultUser());
            }
        });
    }
}