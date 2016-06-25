export * from './BootstrapActions';
export * from './TodoListAction';
export * from './LoginActions';
export * from './LogoutActions';
export * from './UserActions';
export * from './ConfigActions';
export * from './TokenActions';
export * from './AppAction';
export * from './RegisterActions';
export * from './TodoActions';

import {requestLogout} from './LogoutActions';
import {put} from 'redux-saga/effects';

/**
 *
 * @param response
 * @param dispatch
 */
export function responseStatusCheck(response:IResponse, dispatch) {
    if (response.status === 400) {
        throw new Error('Invalid Request');
    } else if (response.status === 404) {
        throw new Error('No data found');
    } else if (response.status === 401) {
        dispatch(requestLogout());
        throw new Error('You need to login');
    } else if (response.status === 500) {
        throw new Error('Server error');
    } else if (response.status === 403) {
        throw new Error('Not enough rights to see this data');
    } else if (response.status === 0) {
        throw new Error('Please check your network connection');
    }

    return response;
}

/**
 *
 * @param response
 * @param dispatch
 */
export function* checkResponseStatus(response:IResponse) {
    let data = null;

    if (response.status === 400) {
        data = new Error('Invalid Request');
    } else if (response.status === 404) {
        data = new Error('No data found');
    } else if (response.status === 401) {
        yield put(requestLogout());
        data = new Error('You need to login');
    } else if (response.status === 500) {
        data = new Error('Server error');
    } else if (response.status === 403) {
        data = new Error('Not enough rights to see this data');
    } else if (response.status === 0) {
        data = new Error('Please check your network connection');
    }

    return data;
}

