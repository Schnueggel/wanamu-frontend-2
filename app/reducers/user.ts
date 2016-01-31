import {ACTION_USER_REQUEST, ACTION_USER_ERROR, ACTION_USER_LOADED, ACTION_USER_CLEAR} from '../actions/index';

const initialState = {
    error: null,
    isLoading: false,
    user: null
};

export function user(state = initialState, action: any) {
    const { type, error, user } = action;

    switch (type) {
        case ACTION_USER_REQUEST:
            return Object.assign({}, state, {isLoading: true, error: null});
        case ACTION_USER_LOADED:
            return Object.assign({}, state, {user, isLoading: false});
        case ACTION_USER_ERROR:
            return Object.assign({}, state, {error, isLoading: false});
        case ACTION_USER_CLEAR:
            return Object.assign({}, initialState);
        default:
            return state;
    }
}
