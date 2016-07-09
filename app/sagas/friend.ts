import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import {ACTION_FRIEND_DELETE_REQUEST} from 'actions/index';
import * as FriendActions from 'actions/FriendListAction';
import {defaultRequestOptions} from '../constants';
import {appError} from 'actions/AppAction';
import store from 'stores/appStore';
import {checkResponseStatus} from 'actions/actions';

/**
 * Deletes Friend
 *
 * @returns {function(any): Promise<TResult>|Promise<U>}
 */
export function* doDeleteFriend(action):any {

    const options = defaultRequestOptions(store.getState().auth.token, 'DELETE');

    let response:IResponse = yield call(fetch, `${store.getState().app.config.WU_API_BASE_URL}/friend/${action.friend._id}`, options);

    let result = yield checkResponseStatus(response);

    if (result instanceof Error) {
        return yield put(appError(result.message));
    } else if ([304, 200].indexOf(response.status) > -1) {
        yield put(FriendActions.friendDeleted(action.friend));
        yield put(FriendActions.doLoadFriendList());
    }  else {
        put(FriendActions.friendDeleteError(action.id, 'Deleting Friend failed'));
    }
}

export function* watchDeleteFriendRequest() {
    yield* takeEvery(ACTION_FRIEND_DELETE_REQUEST, doDeleteFriend);
}
