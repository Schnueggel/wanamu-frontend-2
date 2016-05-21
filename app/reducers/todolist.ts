import * as Actions from '../actions/index';
import { Map, Set } from 'immutable';
import ITodo = wu.model.data.ITodo;
import {VisibleTodos} from '../constants';
import ITodoView = wu.model.view.ITodoView;
import * as _ from 'lodash';
import {Todo} from '../models/Todo';

const initialState: wu.ITodoListState = {
    visibility: VisibleTodos.Open,
    error: null,
    isLoading: false,
    id: null,
    todos: Map() as Immutable.Map<string, ITodoView>,
    isTodoSyncing: false,
    syncingTodos: Set() as Immutable.Set<ITodo>
};

export function todolist(state = initialState, action: any) {
    const { error, todo } = action;

    switch (action.type) {
        case Actions.ACTION_TODOLIST_VISIBILITY:
            return _.assign({}, state, {visibility: action.visibility});
        case Actions.ACTION_TODOLIST_REQUEST:
            return _.assign({}, state, {isLoading: true, error: null});
        case Actions.ACTION_TODOLIST_LOADED:
            return _.assign({}, state, {todos: Map(action.todos.map(todo => [todo._id, new Todo(todo)])), isLoading: false, id: action.id});
        case Actions.ACTION_TODOLIST_ERROR:
            return _.assign({}, state, {error, isLoading: false});
        case Actions.ACTION_TODO_CREATE_REQUEST:
        case Actions.ACTION_TODO_UPDATE_REQUEST:
        case Actions.ACTION_TODO_DELETE_REQUEST:
        case Actions.ACTION_TODO_FINISH_REQUEST:
            return _.assign({}, state, {isTodoSyncing: true, error: null, syncingTodos: state.syncingTodos.add(todo._id) });
        case Actions.ACTION_TODO_UPDATE_REQUEST_ERROR:
            return _.assign({}, state, {isTodoSyncing: false, error, syncingTodos: state.syncingTodos.delete(todo._id) });
        case Actions.ACTION_TODO_UPDATE_SUCCESS:
            return _.assign({}, state, {isTodoSyncing: false, syncingTodos: state.syncingTodos.delete(todo._id) });
        case Actions.ACTION_TODO_UPDATE:
        case Actions.ACTION_TODO_CREATE:
        case Actions.ACTION_TODO_FINISH:
            return _.assign({}, state, {todos: state.todos.set(todo._id, new Todo(todo))});
        case Actions.ACTION_TODO_CREATE_REQUEST_ERROR:
            return _.assign({}, state, {isTodoSyncing: false, error, syncingTodos: state.syncingTodos.delete(todo._id) });
        case Actions.ACTION_TODO_FINISH_REQUEST_ERROR:
        case Actions.ACTION_TODO_DELETE_REQUEST_ERROR:
            return _.assign({}, state, {isTodoSyncing: false, todos: state.todos.set(todo._id, new Todo(todo)), error, syncingTodos: state.syncingTodos.delete(todo._id) });
        case Actions.ACTION_TODO_CREATE_SUCCESS:
            return _.assign({}, state, {isTodoSyncing: false, syncingTodos: state.syncingTodos.delete(todo._id)});
        case Actions.ACTION_TODO_DELETE_SUCCESS:
            return _.assign({}, state, {isTodoSyncing: false, todos: state.todos.delete(todo._id), syncingTodos: state.syncingTodos.delete(todo._id)});
        case Actions.ACTION_TODO_FINISH_SUCCESS:
            return _.assign({}, state, {isTodoSyncing: false, todos: state.todos.set(todo._id, new Todo(todo)), syncingTodos: state.syncingTodos.delete(todo._id)});
        case Actions.ACTION_TODO_VIEW_CHANGE:
            return _.assign({}, state, {todos: state.todos.set(todo._id, new Todo(todo))});
        default:
            return state;
    }
}
