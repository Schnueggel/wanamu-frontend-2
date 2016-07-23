import * as Actions from './index';
import 'isomorphic-fetch';
import { defaultRequestOptions } from '../constants';
import { UserNameCheck } from '../constants';
import * as _ from 'lodash';

export function registerRequest(data) {
    return {
        type: Actions.ACTION_REGISTER_REQUEST,
        data
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
            .then((response: IResponse) => {
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
