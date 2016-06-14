import * as Actions from './index';
import { defaultRequestOptions } from '../constants';
import { routerActions } from 'react-router-redux';
import { appError } from './AppAction';
import * as _ from 'lodash';


export function notificationRequest() {
    return {
        type: Actions.ACTION_NOTIFICATION_REQUEST
    };
}

export function notificationError(error: string) {
    return {
        type: Actions.ACTION_NOTIFICATION_ERROR,
        error
    };
}


export function notificationsLoaded(data) {
    return {
        type: Actions.ACTION_NOTIFICATION_LOADED,
        data
    };
}


export function doLoadNotifications() {
    return (dispatch, getState) => {

        dispatch(notificationRequest());

        const options = defaultRequestOptions(getState().auth.token, 'GET');

        return fetch(`${getState().app.config.WU_API_BASE_URL}/notifications`,options)
            .then((response: IResponse) => {
                if ([304, 200].indexOf(response.status) > -1) {
                    return response.json();
                } else if ([422, 400].indexOf(response.status) > -1) {
                    throw new Error('Invalid Request');
                } else if (response.status === 404) {
                    throw new Error('No data found');
                } else if (response.status === 401) {
                    dispatch(appError('You need to login'));
                    dispatch(routerActions.push('/login'));
                    return null;
                } else if (response.status === 500) {
                    throw new Error('Server error');
                } else if (response.status === 403) {
                    throw new Error('Not enough rights to see this data');
                } else if (response.status === 0) {
                    throw new Error('Please check your network connection');
                } else {
                    throw new Error('Loading todolist data with an unkown state');
                }
            })
            .then( data => {
                return _.get(data, 'data');
            })
            .then( notifications => {
                if (notifications) {
                    dispatch(notificationsLoaded(notifications));
                } else {
                    dispatch(notificationError('No data found'));
                }
            })
            .catch(err => {
                dispatch(notificationError(err.message));
            });
    }
}
