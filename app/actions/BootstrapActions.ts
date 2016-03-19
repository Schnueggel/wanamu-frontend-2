import * as Actions from './index';
import { configRequest, configLoad } from './ConfigActions';
import * as fetch from 'isomorphic-fetch';
import { loginRequest } from './LoginActions';
import { LocalStorage, defaultRequestOptions } from '../constants';
import * as _  from 'lodash';
import { tokenLoaded, tokenRestore, tokenClear } from './TokenActions';
import { userLoaded, userRequest } from './UserActions';

/**
 *
 * @returns {{type: string}}
 */
export function userTested() {
    return {
        type: Actions.ACTION_USER_TESTED
    };
}

export function bootstrapReady() {
    return {
        type: Actions.ACTION_BOOTING_FINISHED
    };
}

/**
 * Tries to load the default user if there is a token
 * @returns {function(any, any): *}
 */
export function loadDefaultUser() {
    return (dispatch, getState) => {

        const options = defaultRequestOptions(getState().auth.token, 'GET');

        dispatch(userRequest());

        return fetch(`${getState().app.config.apiBaseUrl}/user`, options)
            .then( (response: Response) => {
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
                    dispatch(userTested());
                } else {
                    throw new Error('Invalid response for current user request');
                }
            })
            .catch( err => {
                dispatch(tokenClear());
                dispatch(userLoaded(null));
                console.log(err);
                dispatch(userTested());
            })
    };
}

/**
 * Bootstraps the application
 * @returns {function(any): undefined}
 */
export function bootstrap() {
    return (dispatch) => {
        dispatch(tokenRestore());
        dispatch(configLoad()).then(() => {
            dispatch(loadDefaultUser()).then(()=> {
                dispatch(bootstrapReady());
            });
        });
    };
}