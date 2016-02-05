import * as Actions from '../actions/index';
import { Map, Set } from 'immutable';

const initialState = {
    error: null,
    isLoading: false,
    todos: null,
    isTodoSyncing: false,
    syncingTodos: Set()
};

export function todolist(state = initialState, action: any) {
    const { type, error, todo } = action;

    switch (type) {
        case Actions.ACTION_TODOLIST_REQUEST:
            return Object.assign({}, state, {isLoading: true, error: null});
        case Actions.ACTION_TODOLIST_LOADED:
            return Object.assign({}, state, {todos: Map(action.todos.map(todo => [todo._id, todo])), isLoading: false});
        case Actions.ACTION_TODOLIST_ERROR:
            return Object.assign({}, state, {error, isLoading: false});
        case Actions.ACTION_TODO_UPDATE_REQUEST:
            return Object.assign({}, state, {isTodoSyncing: true, syncingTodos: state.syncingTodos.add(todo._id) });
        case Actions.ACTION_TODO_UPDATE_REQUEST_ERROR:
            return Object.assign({}, state, {isTodoSyncing: false, error, syncingTodos: state.syncingTodos.delete(todo._id) });
        case Actions.ACTION_TODO_UPDATE_REQUEST_SUCCESS:
            return Object.assign({}, state, {isTodoSyncing: false, syncingTodos: state.syncingTodos.delete(todo._id) });
        case Actions.ACTION_TODO_UPDATE:
            return Object.assign({}, state, {todolist: state.todos.set(todo._id, todo)});
        default:
            return state;
    }
}
