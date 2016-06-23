import {takeEvery} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import * as TodoListActions from 'actions/TodoListAction';
import {defaultRequestOptions} from '../constants';
import {appError} from 'actions/AppAction';
import {routerActions} from 'react-router-redux';
import * as _ from 'lodash';
import {ACTION_TODOLIST_REQUEST} from 'actions/index';
import store from 'stores/appStore';

/**
 * Loads the todolist from the backend
 *
 * @returns {function(any): Promise<TResult>|Promise<U>}
 */
export function* doTodoListLoad(action):any {
    const options = defaultRequestOptions(store.getState().auth.token, 'GET');

    try {
        let response:IResponse = yield call(fetch, `${store.getState().app.config.WU_API_BASE_URL}/todolist/${action.id}`, options);

        let data = null;

        if ([304, 200].indexOf(response.status) > -1) {
            const todolist = _.get(yield response.json(), 'data');

            if (todolist) {
                return yield put(TodoListActions.todoListLoaded(todolist, action.id));
            } else {
                return yield put(TodoListActions.todoListError('Invalid response data found'));
            }
        } else if ([422, 400].indexOf(response.status) > -1) {
            data = new Error('Invalid Request');
        } else if (response.status === 404) {
            data = new Error('No data found');
        } else if (response.status === 401) {
            yield put(appError('You need to login'));
            return yield put(routerActions.push('/login'));
        } else if (response.status === 500) {
            data = new Error('Server error');
        } else if (response.status === 403) {
            data = new Error('Not enough rights to see this data');
        } else if (response.status === 0) {
            data = new Error('Please check your network connection');
        } else {
            data = new Error('Loading todolist data with an unknown state');
        }
        yield put(TodoListActions.todoListError(data.message));

    } catch (err) {
        yield put(TodoListActions.todoListError(err.message));
    }
}

export function* watchTodoListLoad() {
    yield* takeEvery(ACTION_TODOLIST_REQUEST, doTodoListLoad);
}
