import * as Actions from './index';
import { LocalStorage } from '../constants';

/**
 * Stores the token in the localStorage and dispatches the token loaded action
 * @param token
 * @returns {{type: string, token: any}}
 */
export function tokenStore(token) {

    localStorage.setItem(LocalStorage.token, token);

    return dispatch => {
        dispatch(tokenLoaded(token));
    }
}

/**
 * trigges the token loaded action
 * @returns {{type: string}}
 */
export function tokenLoaded(token) {
    return {
        type: Actions.ACTION_TOKEN_LOADED,
        token
    };
}
/**
 * Clears the auth token from the store
 * @returns {{type: string}}
 */
export function tokenClear() {
    localStorage.removeItem(LocalStorage.token);

    return {
        type: Actions.ACTION_TOKEN_CLEAR
    };
}

export function tokenRestore() {
    return (dispatch) => {
        const token = localStorage.getItem(LocalStorage.token);

        if (token) {
            dispatch(tokenLoaded(token));
        }
    }
}