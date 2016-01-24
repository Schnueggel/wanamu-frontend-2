import { ACTION_TOKEN_LOADED } from '../actions/index';
import { ACTION_TOKEN_CLEAR } from '../actions/index';

const initalState = {
    token: null
};

export function auth(state = initalState, action: any) {
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
