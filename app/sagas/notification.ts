import {takeEvery} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import * as NotificationActions from 'actions/NotificationActions';
import {defaultRequestOptions} from '../constants';
import {appError} from 'actions/AppAction';
import * as _ from 'lodash';
import {ACTION_NOTIFICATION_REQUEST, ACTION_USER_LOADED, ACTION_MARK_NOTIFICATION_REQUEST, ACTION_MARK_NOTIFICATION_LOADED} from 'actions/index';
import store from 'stores/appStore';
import {checkResponseStatus} from 'actions/actions';

/**
 * Loads all notifications
 * @returns {any}
 */
export function* doLoadNotifications(): any {

    const options = defaultRequestOptions(store.getState().auth.token, 'GET');
    const response:IResponse = yield call(fetch, `${store.getState().app.config.WU_API_BASE_URL}/notification`, options);

    let result = yield checkResponseStatus(response);

    if (result instanceof Error) {
        return yield put(appError(result.message));
    } else if ([304, 200].indexOf(response.status) > -1) {

        const notifications = _.get(yield response.json(), 'data');

        return yield put(NotificationActions.notificationsLoaded(notifications));
    } else if (response.status === 422) {
        result = new Error('Invalid Request');
    } else {
        result = new Error('Loading Notifications failed');
    }

    return yield put(NotificationActions.notificationError(result.message));
}

/**
 * Loads all notifications
 * @returns {any}
 */
export function* doMarkNotifications(action): any {
    const options = defaultRequestOptions(store.getState().auth.token, 'PUT');

    options.body = JSON.stringify(action.ids);

    const response:IResponse = yield call(fetch, `${store.getState().app.config.WU_API_BASE_URL}/notifications/markread`, options);

    let result = yield checkResponseStatus(response);

    if (result instanceof Error) {
        return yield put(appError(result.message));
    } else if ([304, 200].indexOf(response.status) > -1) {
        return yield put(NotificationActions.notificationsMarkReadLoaded());
    } else if (response.status === 422) {
        result = new Error('Invalid Request');
    } else {
        result = new Error('Marking Notofications as read failed');
    }

    return yield put(NotificationActions.notificationError(result.message));
}

export function* watchLoadNotifications() {
    yield* takeEvery(ACTION_USER_LOADED, doLoadNotifications);
    yield* takeEvery(ACTION_NOTIFICATION_REQUEST, doLoadNotifications);
    yield* takeEvery(ACTION_MARK_NOTIFICATION_LOADED, doLoadNotifications);
}

export function* watchMarkNotifications() {
    yield* takeEvery(ACTION_MARK_NOTIFICATION_REQUEST, doMarkNotifications);
}
