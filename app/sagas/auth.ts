import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import {ACTION_LOGOUT_REQUEST} from 'actions/index';
import { tokenClear } from 'actions/TokenActions';
import { userClear } from 'actions/UserActions';
import { routerActions } from 'react-router-redux';

/**
 * Logging out user 
 *
 * @returns {function(any): Promise<TResult>|Promise<U>}
 */
export function* doLogout():any {
    put(tokenClear());
    put(userClear());
    put(routerActions.push('/login'));
}

export function* watchLogoutRequest() {
    yield* takeEvery(ACTION_LOGOUT_REQUEST, doLogout);
}
