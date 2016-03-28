import * as Actions from './index';
import * as fetch from 'isomorphic-fetch';
import { defaultRequestOptions } from '../constants';
import { UserNameCheck } from '../constants';

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

export function usernameCheckRequest() {
    return {
        type: Actions.ACTION_REGISTER_USERNAME_CHECK_REQUEST
    };
}

export function usernameValid(state: number) {
    return {
        type: Actions.ACTION_REGISTER_USERNAME_CHECK,
        state
    };
}
export function usernameCheckError(error: string) {
    return {
        type: Actions.ACTION_REGISTER_USERNAME_CHECK_ERROR,
        error
    };
}

export function usernameCheck(name) {
    return (dispatch: Function, getState: Function) => {

        dispatch(usernameCheckRequest());

        const options = defaultRequestOptions(null, 'GET');

        return fetch(`${getState().app.config.WU_API_BASE_URL}/user/username/${name}`, options)
            .then((response: Response) => {
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
                dispatch(usernameCheckError(err.message));
            });
    }
}

export function register(data: any) {
    return (dispatch: Function, getState: Function) => {

        dispatch(registerRequest());

        const options = defaultRequestOptions();

        options.body = JSON.stringify(data);

        return fetch(`${getState().app.config.WU_API_BASE_URL}/register`, options)
            .then((response: Response) => {
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
