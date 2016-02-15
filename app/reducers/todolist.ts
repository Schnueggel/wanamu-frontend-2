import * as Actions from '../actions/index';
import { Map, Set } from 'immutable';
import ITodo = wu.model.data.ITodo;

const initialState = {
    error: null,
    isLoading: false,
    todos: Map() as Immutable.Map<string, ITodo>,
    isTodoSyncing: false,
    syncingTodos: Set() as Immutable.Set<ITodo>
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
        case Actions.ACTION_TODO_CREATE_REQUEST:
        case Actions.ACTION_TODO_UPDATE_REQUEST:
        case Actions.ACTION_TODO_DELETE_REQUEST:
            return Object.assign({}, state, {isTodoSyncing: true, error: null, syncingTodos: state.syncingTodos.add(todo._id) });
        case Actions.ACTION_TODO_UPDATE_REQUEST_ERROR:
            return Object.assign({}, state, {isTodoSyncing: false, error, syncingTodos: state.syncingTodos.delete(todo._id) });
        case Actions.ACTION_TODO_UPDATE_SUCCESS:
            return Object.assign({}, state, {isTodoSyncing: false, syncingTodos: state.syncingTodos.delete(todo._id) });
        case Actions.ACTION_TODO_UPDATE:
        case Actions.ACTION_TODO_CREATE:
            return Object.assign({}, state, {todos: state.todos.set(todo._id, todo)});
        case Actions.ACTION_TODO_CREATE_REQUEST_ERROR:
        case Actions.ACTION_TODO_DELETE_REQUEST_ERROR:
            return Object.assign({}, state, {isTodoSyncing: false, error, syncingTodos: state.syncingTodos.delete(todo._id) });
        case Actions.ACTION_TODO_CREATE_SUCCESS:
            return Object.assign({}, state, {isTodoSyncing: false, syncingTodos: state.syncingTodos.delete(todo._id)});
        case Actions.ACTION_TODO_DELETE_SUCCESS:
            return Object.assign({}, state, {isTodoSyncing: false, todos: state.todos.delete(todo._id), syncingTodos: state.syncingTodos.delete(todo._id)});
        default:
            return state;
    }
}
