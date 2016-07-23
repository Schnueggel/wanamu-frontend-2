import {takeEvery} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import * as RegisterActions from 'actions/RegisterActions';
import {defaultRequestOptions} from '../constants';
import {appError} from 'actions/AppAction';
import * as _ from 'lodash';
import {ACTION_REGISTER_REQUEST} from 'actions/index';
import store from 'stores/appStore';
import {checkResponseStatus} from 'actions/actions';

/**
 * Register
 * @returns {any}
 */
export function* doRegister(action): any {
    const options = defaultRequestOptions(store.getState().auth.token, 'POST');
    options.body = JSON.stringify(action.data);

    const response:IResponse = yield call(fetch, `${store.getState().app.config.WU_API_BASE_URL}/register`, options);

    let result = yield checkResponseStatus(response);

    if (result instanceof Error) {
        return yield put(appError(result.message));
    } else if ([304, 200].indexOf(response.status) > -1) {
        const user = _.get(yield response.json(), 'data');

        return yield put(RegisterActions.registered(user));
    } else if (response.status === 422) {
        return yield put(RegisterActions.registerFormError(yield response.json()));
    } else {
        result = new Error('Registration failed');
    }

    return yield put(RegisterActions.registerError(result.message));
}

export function* watchRegister() {
    yield* takeEvery(ACTION_REGISTER_REQUEST, doRegister);
}
