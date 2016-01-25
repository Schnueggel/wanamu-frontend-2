import * as Actions from './index';
import * as fetch from 'isomorphic-fetch';
import { defaultRequestOptions } from '../constants';
import { appError } from './AppAction';
import routeActions = ReduxSimpleRouter.routeActions;
import { UserNameCheck } from '../constants';
import { User } from '../models/data/User';

export function registerRequest() {
    return {
        type: Actions.ACTION_REGISTER_REQUEST
    };
}

export function registerError(error) {
    return {
        type: Actions.ACTION_REGISTER_ERROR,
        error
    };
}

export function registerFormError(error) {
    return {
        type: Actions.ACTION_REGISTER_FORM_ERROR,
        error
    };
}

export function registered(user) {
    return {
        type: Actions.ACTION_REGISTERED,
        user
    };
}

export function usernameValid(state: number) {
    return {
        type: Actions.ACTION_REGISTER_ERROR,
        state
    };
}

export function usernameCheck(name) {
    return (dispatch: Function, getState: Function) => {

        dispatch(registerRequest());

        const options = defaultRequestOptions(null, 'GET');

        return fetch(`${getState().app.config.apiBaseUrl}/user/username/${name}`, options)
            .then(response => {
                if (response.status === 200 || response.status === 304) {
                    return response.json();
                }
            })
            .then(data => {
                return _.get(data, 'data');
            })
            .then( valid => {
                let state = UserNameCheck.Unkown;
                if (valid === true) {
                    state = UserNameCheck.Valid
                } else if ( valid === false) {
                    state = UserNameCheck.Invalid
                }

                dispatch(usernameValid(state));
            })
            .catch(err => {
                dispatch(registerError(err.message));
            });
    }
}

export function register(data: any) {
    return (dispatch: Function, getState: Function) => {

        dispatch(registerRequest());

        const options = defaultRequestOptions();

        options.body = JSON.stringify(data);

        return fetch(`${getState().app.config.apiBaseUrl}/register`, options)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status === 422) {
                    dispatch(registerFormError(response.json()));
                    throw new Error('Invalid form input please check your input');
                } else if (response.status === 400) {
                    throw new Error('Invalid Request');
                } else if (response.status === 404) {
                    throw new Error('Data endpoint not found');
                } else if (response.status === 500) {
                    throw new Error('Server error');
                } else if (response.status === 0) {
                    throw new Error('Please check your network connection');
                } else {
                    throw new Error('Loading todolist data with an unkown state');
                }
            })
            .then(data => {
                return _.get(data, '.data[0]');
            })
            .then(user => {
                if (user) {
                    dispatch(registered(user));
                } else {
                    dispatch(registerError('No data found'));
                }
            })
            .catch(err => {
                dispatch(registerError(err.message));
            });
    }
}