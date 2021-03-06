import * as Actions from '../actions/index';

const initialState: wu.IUserState = {
    error: null,
    isLoading: false,
    user: null,
    invitations: 0
};

export function user(state = initialState, action: any) {
    const { type, error, user } = action;

    switch (type) {
        case Actions.ACTION_USER_REQUEST:
            return Object.assign({}, state, {isLoading: true, error: null});
        case Actions.ACTION_USER_LOADED:
            return Object.assign({}, state, {user, isLoading: false});
        case Actions.ACTION_USER_ERROR:
            return Object.assign({}, state, {error, isLoading: false});
        case Actions.ACTION_USER_CLEAR:
            return Object.assign({}, state, initialState);
        case Actions.ACTION_USER_INVITATIONS:
            return Object.assign({}, state, {invitations: action.count});
        default:
            return state;
    }
}
