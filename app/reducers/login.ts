import {ACTION_LOGIN_ERROR} from '../actions/index';
import {ACTION_LOGIN_REQUEST} from '../actions/index';

const initalState = {
    error: null
};

export function login(state = initalState, action: any) {
    const { type, error } = action;

    switch (type) {
        case ACTION_LOGIN_ERROR:
            return Object.assign({}, state, {error});
        case ACTION_LOGIN_REQUEST:
            return Object.assign({}, state, {error: null});
    }

    return state;
}
