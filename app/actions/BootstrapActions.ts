import * as Actions from './index';
import { configRequest, configLoad } from './ConfigAction';
import * as fetch from 'isomorphic-fetch';
import { loginRequest } from './LoginActions';
import { LocalStorage, defaultRequestOptions } from '../constants';
import * as _  from 'lodash';
import { tokenLoaded, tokenRestore } from './TokenActions';
import { userLoaded } from './UserActions';

/**
 * Tries to load the default user if there is a token
 * @returns {function(any, any): *}
 */
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

/**
 * Bootstraps the application
 * @returns {function(any): undefined}
 */
export function bootstrap() {
    return (dispatch) => {
        dispatch(tokenRestore());
        dispatch(configLoad());
    }
}