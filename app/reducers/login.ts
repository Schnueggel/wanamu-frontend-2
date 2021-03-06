import {ACTION_LOGIN_ERROR, ACTION_LOGIN_REQUEST} from '../actions/index';

const initialState = {
    error: null
};

export function login(state = initialState, action: any) {
    const { type, error } = action;

    switch (type) {
        case ACTION_LOGIN_ERROR:
            return Object.assign({}, state, {error});
        case ACTION_LOGIN_REQUEST:
            return Object.assign({}, state, {error: null});
        default:
            return state;
    }
}
