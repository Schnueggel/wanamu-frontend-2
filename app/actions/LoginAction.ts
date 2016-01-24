import * as Actions from './index';
import { userLoaded } from './AppAction';
import * as fetch from 'isomorphic-fetch';
import * as _ from 'lodash';
import { defaultRequestOptions, LocalStorage } from '../constants';

export function loginRequest() {
    return {
        type: Actions.ACTION_LOGIN_REQUEST
    };
}

export function loginError(error: string) {
    return {
        type: Actions.ACTION_LOGIN_ERROR,
        error
    };
}

/**
 * Stores the token in the localStorage and dispatches the token loaded action
 * @param token
 * @returns {{type: string, token: any}}
 */
export function storeToken(token) {

    localStorage.setItem(LocalStorage.token, token);

    return {
        type: Actions.ACTION_TOKEN_LOADED,
        token
    };
}

export function login(username, password) {
    return (dispatch, getState) => {
        dispatch(loginRequest());

        const options = defaultRequestOptions();

        options.body = JSON.stringify({username, password});

        return fetch(`${getState().app.config.apiBaseUrl}/auth/login`,options)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else if ([403, 422, 404].indexOf(response.status) > -1) {
                    throw new Error('Please check your credentials');
                } else if (response.status === 500) {
                    throw new Error('Server error');
                } else if (response.status === 0) {
                    throw new Error('Please check your network connection');
                } else {
                    throw new Error('Login failed with an unkown state');
                }
            })
            .then(data => {
                if (typeof data.token !== 'string' || typeof _.get(data, '.data[0]._id') !== 'string') {
                    throw new Error('Invalid server response');
                }
                dispatch(storeToken(data.token));
                dispatch(userLoaded(data.data[0]));
            })
            .catch(err => {
                dispatch(loginError(err.message));
            });
    }
}