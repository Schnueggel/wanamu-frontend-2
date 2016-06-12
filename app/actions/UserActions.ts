import * as Actions from './index';
import * as io from 'socket.io-client';

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

export function doConnectToSocket() {
    return (dispatch, getState:()=> wu.IState) => {
        const notifications = io.connect(`${getState().app.config.WU_API_BASE_URL}/notification`, {query: 'jwt=' + getState().auth.token, transports: ['websocket']});

        notifications.on('error', (err) => {
            console.log(err);
        });

        notifications.on('joined', () => {
            console.log('join user room');
        });

        notifications.on('Friend_Accepted', (msg)=> {
            console.log(msg);
        });
    }
}
