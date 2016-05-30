import * as Actions from './index';

export function userLoaded(user) {
    return {
        type: Actions.ACTION_USER_LOADED,
        user
    };
}

export function userRequest() {
    return {
        type: Actions.ACTION_USER_REQUEST
    };
}

export function userClear() {
    return {
        type: Actions.ACTION_USER_CLEAR
    };
}

export function setInvitationCount(value) {
    return {
        type: Actions.ACTION_USER_INVITATIONS,
        count: value
    };
}
