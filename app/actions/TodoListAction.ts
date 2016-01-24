import * as fetch from 'isomorphic-fetch';
import * as Actions from './index';
import { defaultRequestOptions } from '../constants';
import { appError } from './AppAction';
import { routeActions } from 'redux-simple-router';
import * as _ from 'lodash';

/**
 * Todolist Loaded Action creator
 * @param todolist
 * @returns {{type: string, config: any}}
 */
export function todoListLoaded(todolist: Object) {
    return {
        type: Actions.ACTION_TODOLIST_LOADED,
        todolist
    };
}

/**
 * TodoList Error action creator
 * @param error
 * @returns {{type: string, error: any}}
 */
export function todoListError(error: string) {
    return {
        type: Actions.ACTION_TODOLIST_ERROR,
        error
    };
}

/**
 * Config Request action
 * @returns {{type: string}}
 */
export function todoListRequest() {
    return {
        type: Actions.ACTION_TODOLIST_REQUEST
    }
}

/**
 * Loads the todolist from the backend
 *
 * @returns {function(any): Promise<TResult>|Promise<U>}
 */
export function todoListLoad(id:string) {
    return (dispatch, getState) => {

        dispatch(todoListRequest());
        const options = defaultRequestOptions(getState().auth.token, 'GET');

        return fetch(`${getState().app.config.apiBaseUrl}/todolist/${id}`,options)
            .then( response => {
                if ([304, 200].indexOf(response.status) > -1) {
                    return response.json();
                } else if ([422, 400].indexOf(response.status) > -1) {
                    throw new Error('Invalid Request');
                } else if (response.status === 404) {
                    throw new Error('No data found');
                } else if (response.status === 401) {
                    dispatch(appError('You need to login'));
                    dispatch(routeActions.push('/login'));
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
                return _.get(data, '.data');
            })
            .then( todolist => {
                if (todolist) {
                    dispatch(todoListLoaded(todolist));
                } else {
                    dispatch(todoListError('No data found'));
                }
            })
            .catch(err => {
                dispatch(todoListError(err.message));
            });
    }
}