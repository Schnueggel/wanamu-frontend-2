import { ACTION_FRIENDLIST_ERROR, ACTION_FRIENDLIST_LOADED, ACTION_FRIENDLIST_REQUEST } from '../actions/index';


const initialState = {
    friends: [],
    error: null,
    isLoading: false,
};

export function friends(state = initialState, action: any) {
    const {friends, error} = action;

    switch (action.type) {
        case ACTION_FRIENDLIST_LOADED:
            return Object.assign({}, state, {friends, isLoading: false});
        case ACTION_FRIENDLIST_ERROR:
            return Object.assign({}, state, {error, isLoading: false});
        case ACTION_FRIENDLIST_REQUEST:
            return Object.assign({}, state, {isLoading: true});
        default:
            return state;
    }
}
