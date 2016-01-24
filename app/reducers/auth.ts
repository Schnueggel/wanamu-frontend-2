import {ACTION_TOKEN_LOADED} from '../actions/index';

const initalState = {
    token: null
};

export function auth(state = initalState, action: any) {
    const { type, token } = action;

    if (type === ACTION_TOKEN_LOADED) {
        return Object.assign({}, state, {token});
    }

    return state;
}
