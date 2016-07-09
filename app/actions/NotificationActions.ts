import * as Actions from './index';

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
