import {takeEvery} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import * as TodoActions from 'actions/TodoActions';
import {defaultRequestOptions} from '../constants';
import {appError} from 'actions/AppAction';
import {routerActions} from 'react-router-redux';
import * as _ from 'lodash';
import {ACTION_TODO_UPDATE_REQUEST} from 'actions/index';
import store from 'stores/appStore';
import {checkResponseStatus} from 'actions/actions';

/**
 * Updates a todo
 *
 * @returns {function(any): Promise<TResult>|Promise<U>}
 */
export function* todoDoUpdate(todo:wu.model.data.ITodo):any {
    const options = defaultRequestOptions(store.getState().app.config.WU_API_BASE_URL, 'PUT');

    options.body = JSON.stringify(todo);

    const response:IResponse = yield call(fetch, `${store.getState().app.config.WU_API_BASE_URL}/todo/${todo._id}`, options);

    let result = yield checkResponseStatus(response);

    if (result instanceof Error) {
        return yield put(appError(result.message));
    } else if ([304, 200].indexOf(response.status) > -1) {
        const todo = _.get(yield response.json(), 'data[0]');
        if (_.has(todo, '_id')) {
            put(TodoActions.todoUpdateRequestSuccess(todo));
            put(TodoActions.todoUpdate(todo));
        } else {
            put(TodoActions.todoUpdateRequestError('No data found', todo));
        }
    } else if (response.status === 422) {
        result = new Error('Invalid Request');
    } else {
        result = new Error('Updating todo failed');
    }

    put(TodoActions.todoUpdateRequestError(result.message, todo));
}

export function* watchTodoListLoad() {
    yield* takeEvery(ACTION_TODO_UPDATE_REQUEST, todoDoUpdate);
}
