import {takeEvery} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import * as TodoActions from 'actions/TodoActions';
import {defaultRequestOptions} from '../constants';
import {appError} from 'actions/AppAction';
import * as _ from 'lodash';
import {ACTION_TODO_UPDATE_REQUEST, ACTION_TODO_CREATE_REQUEST, ACTION_TODO_DELETE_REQUEST} from 'actions/index';
import store from 'stores/appStore';
import {checkResponseStatus} from 'actions/actions';

export function* doCreateTodo(action): any {

    const options = defaultRequestOptions(store.getState().auth.token, 'POST');

    options.body = JSON.stringify(action.todo);

    const response:IResponse = yield call(fetch, `${store.getState().app.config.WU_API_BASE_URL}/todo/${action.todo.todolistId}`, options);

    let result = yield checkResponseStatus(response);

    if (result instanceof Error) {
        return yield put(appError(result.message));
    } else if ([304, 200].indexOf(response.status) > -1) {

        const todo = _.get(yield response.json(), 'data[0]');

        if (_.has(todo, '_id')) {
            yield put(TodoActions.todoUpdateRequestSuccess(todo));
            return yield put(TodoActions.todoUpdate(todo));
        } else {
            result = new Error('No data found');
        }

        return;
    } else if (response.status === 422) {
        result = new Error('Invalid Request');
    } else {
        result = new Error('Creating todo failed');
    }

    return yield put(TodoActions.todoUpdateRequestError(result.message, action.todo));
}


export function* doDeleteTodo(action): any {
    const options = defaultRequestOptions(store.getState().auth.token, 'DELETE');

    options.body = JSON.stringify(action.todo);

    const response:IResponse = yield call(fetch, `${store.getState().app.config.WU_API_BASE_URL}/todo/${action.todo._id}`, options);

    let result = yield checkResponseStatus(response);

    if (result instanceof Error) {
        return yield put(appError(result.message));
    } else if ([304, 200].indexOf(response.status) > -1) {

        const todo = _.get(yield response.json(), 'data[0]');

        if (_.has(todo, '_id')) {
            yield put(TodoActions.todoDeleteRequestSuccess(todo));
            return yield put(TodoActions.todoUpdate(todo));
        } else {
            result = new Error('No data found');
        }

        return;
    } else if (response.status === 422) {
        result = new Error('Invalid Request');
    } else {
        result = new Error('Deleting todo failed');
    }

    return yield put(TodoActions.todoDeleteRequestError(result.message, action.todo));
}

/**
 * Updates a todo
 *
 * @returns {function(any): Promise<TResult>|Promise<U>}
 */
export function* doUpdateTodo(action):any {
    const options = defaultRequestOptions(store.getState().auth.token, 'PUT');

    options.body = JSON.stringify(action.todo);

    const response:IResponse = yield call(fetch, `${store.getState().app.config.WU_API_BASE_URL}/todo/${action.todo._id}`, options);

    let result = yield checkResponseStatus(response);

    if (result instanceof Error) {
        return yield put(appError(result.message));
    } else if ([304, 200].indexOf(response.status) > -1) {

        const todo = _.get(yield response.json(), 'data[0]');

        if (_.has(todo, '_id')) {
            yield put(TodoActions.todoUpdateRequestSuccess(todo));
            return yield put(TodoActions.todoUpdate(todo));
        } else {
            result = new Error('No data found');
        }
    } else if (response.status === 422) {
        result = new Error('Invalid Request');
    } else {
        result = new Error('Updating todo failed');
    }

    return yield put(TodoActions.todoUpdateRequestError(result.message, action.todo));
}

export function* watchTodoUpdate() {
    yield* takeEvery(ACTION_TODO_UPDATE_REQUEST, doUpdateTodo);
}

export function* watchTodoCreate() {
    yield* takeEvery(ACTION_TODO_CREATE_REQUEST, doCreateTodo)
}

export function* watchTodoDelete() {
    yield* takeEvery(ACTION_TODO_DELETE_REQUEST, doDeleteTodo)
}
