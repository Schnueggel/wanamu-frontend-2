import * as fetch from 'isomorphic-fetch';
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
export function friendListRequest() {
    return {
        type: Actions.ACTION_FRIENDLIST_REQUEST
    };
}

/**
 *
 * @param friend
 * @returns {{type: string, friend: wu.model.data.IFriend}}
 */
export function friendDeleted(friend: wu.model.data.IFriend) {
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
    }
}

export function friendDeleteError(friend: wu.model.data.IFriend, error) {
    return {
        type: Actions.ACTION_FRIEND_DELETE_ERROR,
        friend,
        error
    };
}

/**
 *
 */
export function doDeleteFriend(friend: wu.model.data.IFriend) {
    return (dispatch, getState: ()=> wu.IState) => {

        dispatch(friendDeleteRequest(friend));

        const options = defaultRequestOptions(getState().auth.token, 'DELETE');

        return fetch(`${getState().app.config.apiBaseUrl}/friend/${friend._id}`,options)
            .then((response: Response) => {
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
                dispatch(doLoadFriendList(getState().user.user.defaultTodolistId));
            })
            .catch(err => {
                dispatch(friendListError(err.message));
            });
    };
}

/**
 * Loads the friendlist from the backend
 *
 * @returns {function(any): Promise<TResult>|Promise<U>}
 */
export function doLoadFriendList(id:string) {
    return (dispatch, getState) => {

        dispatch(friendListRequest());

        const options = defaultRequestOptions(getState().auth.token, 'GET');

        return fetch(`${getState().app.config.apiBaseUrl}/friend`,options)
            .then((response: Response) => {
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
