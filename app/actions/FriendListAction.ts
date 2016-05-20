import * as Actions from './index';
import { defaultRequestOptions } from '../constants';
import { appError } from './AppAction';
import { routerActions } from 'react-router-redux';
import * as _ from 'lodash';

/**
 * FriendList Loaded Action creator
 * @param friends
 * @returns {{type: string, config: any}}
 */
export function friendListLoaded(friends: Object) {
    return {
        type: Actions.ACTION_FRIENDLIST_LOADED,
        friends
    };
}

/**
 * TodoList Error action creator
 * @param error
 * @returns {{type: string, error: any}}
 */
export function friendListError(error: string) {
    return {
        type: Actions.ACTION_FRIENDLIST_ERROR,
        error
    };
}

/**
 * Config Request action
 * @returns {{type: string}}
 */
export function friendListRequest(): any {
    return {
        type: Actions.ACTION_FRIENDLIST_REQUEST
    };
}

/**
 *
 * @param friend
 * @returns {{type: string, friend: wu.model.data.IFriend}}
 */
export function friendDeleted(friend: wu.model.data.IFriend):any  {
    return {
        type: Actions.ACTION_FRIEND_DELETED,
        friend
    };
}

/**
 *
 * @param friend
 */
export function friendDeleteRequest(friend: wu.model.data.IFriend) {
    return {
        type: Actions.ACTION_FRIEND_DELETE_REQUEST,
        friend
    };
}

/**
 *
 * @param usernameOrEmail
 */
export function friendAddRequest(usernameOrEmail: string) {
    return {
        type: Actions.ACTION_FRIEND_ADD_REQUEST,
        usernameOrEmail
    };
}

export function friendAddError(usernameOrEmail: string, error) {
    return {
        type: Actions.ACTION_FRIEND_ADD_ERROR,
        usernameOrEmail,
        error
    };
}

export function friendAdded(usernameOrEmail: string) {
    return {
        type: Actions.ACTION_FRIEND_DELETE_ERROR,
        usernameOrEmail
    };
}

export function friendDeleteError(id: string, error) {
    return {
        type: Actions.ACTION_FRIEND_DELETE_ERROR,
        id,
        error
    };
}

export function showAddFriendsPopup () {
    return {
        type: Actions.ACTION_SHOW_POPUP
    };
}

export function hideAddFriendPopup () {
    return {
        type: Actions.ACTION_HIDE_POPUP
    };
}

/**
 *
 */
export function doDeleteFriend(friend: wu.model.data.IFriend) {
    return (dispatch, getState: ()=> wu.IState) => {

        dispatch(friendDeleteRequest(friend));

        const options = defaultRequestOptions(getState().auth.token, 'DELETE');

        return fetch(`${getState().app.config.WU_API_BASE_URL}/friend/${friend._id}`,options)
            .then((response: IResponse) => {
                if ([304, 200].indexOf(response.status) > -1) {
                    return response.json();
                } else if ([422, 400].indexOf(response.status) > -1) {
                    throw new Error('Invalid Request');
                } else if (response.status === 404) {
                    throw new Error('No data found');
                } else if ([418, 401].indexOf(response.status) > -1) {
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
                    throw new Error('Deleting friend not possible');
                }
            })
            .then(() => {
                dispatch(friendDeleted(friend));
                dispatch(doLoadFriendList());
            })
            .catch(err => {
                dispatch(friendDeleteError(friend._id, err.message));
            });
    };
}

/**
 * Add Friend by username or email
 */
export function doAddFriend(usernameOrEmail: string) {
    return (dispatch, getState: ()=> wu.IState) => {

        dispatch(friendAddRequest(usernameOrEmail));

        const options = defaultRequestOptions(getState().auth.token, 'POST');

        options.body = JSON.stringify({username:usernameOrEmail});

        return fetch(`${getState().app.config.WU_API_BASE_URL}/friend/invitebyusername`,options)
            .then((response: IResponse) => {
                if ([304, 200].indexOf(response.status) > -1) {
                    dispatch(doLoadFriendList());
                    return response.json();
                } else if ([422, 400].indexOf(response.status) > -1) {
                    throw new Error('Invalid Request');
                } else if (response.status === 404) {
                    throw new Error('No data found');
                } else if ([418, 401].indexOf(response.status) > -1) {
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
                    throw new Error('Deleting friend not possible');
                }
            })
            .then(() => {
                dispatch(friendAdded(usernameOrEmail));
                dispatch(doLoadFriendList());
            })
            .catch(err => {
                dispatch(friendAddError(usernameOrEmail, err.message));
            });
    };
}

/**
 * Loads the friendlist from the backend
 *
 * @returns {function(any): Promise<TResult>|Promise<U>}
 */
export function doLoadFriendList() {
    return (dispatch, getState) => {

        dispatch(friendListRequest());

        const options = defaultRequestOptions(getState().auth.token, 'GET');

        return fetch(`${getState().app.config.WU_API_BASE_URL}/friend`,options)
            .then((response: IResponse) => {
                if ([304, 200].indexOf(response.status) > -1) {
                    return response.json();
                } else if ([422, 400].indexOf(response.status) > -1) {
                    throw new Error('Invalid Request');
                } else if (response.status === 404) {
                    throw new Error('No data found');
                } else if ([418, 401].indexOf(response.status) > -1) {
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
                    throw new Error('Loading friendlist data with an unkown state');
                }
            })
            .then( data => {
                return _.get(data, 'data');
            })
            .then( friendslist => {
                if (friendslist) {
                    dispatch(friendListLoaded(friendslist));
                } else {
                    dispatch(friendListError('No data found'));
                }
            })
            .catch(err => {
                dispatch(friendListError(err.message));
            });
    };
}
