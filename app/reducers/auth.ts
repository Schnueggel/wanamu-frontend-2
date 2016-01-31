import { ACTION_TOKEN_LOADED } from '../actions/index';
import { ACTION_TOKEN_CLEAR } from '../actions/index';

const initialState = {
    token: null
};

export function auth(state = initialState, action: any) {
    const { type, token } = action;

    switch (type) {
        case ACTION_TOKEN_LOADED:
            return Object.assign({}, state, {token});
        case ACTION_TOKEN_CLEAR:
            return Object.assign({}, state, {token: null});
        default:
            return state;
    }
}
