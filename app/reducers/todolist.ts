import { ACTION_TODOLIST_ERROR, ACTION_TODOLIST_LOADED, ACTION_TODOLIST_REQUEST } from '../actions/index';

const initialState = {
    error: null,
    isLoading: false,
    todolist: null
};

export function todolist(state = initialState, action: any) {
    const { type, error } = action;

    switch (type) {
        case ACTION_TODOLIST_REQUEST:
            return Object.assign({}, state, {isLoading: true, error: null});
        case ACTION_TODOLIST_LOADED:
            return Object.assign({}, state, {todolist: action.todolist, isLoading: false});
        case ACTION_TODOLIST_ERROR:
            return Object.assign({}, state, {error, isLoading: false});
        default:
            return state;
    }
}
