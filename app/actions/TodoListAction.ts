import { defaultRequestOptions } from '../constants';
import * as fetch from 'isomorphic-fetch';
import * as Actions from './index';
import { appError } from './AppAction';
import { routerActions } from 'react-router-redux';
import * as _ from 'lodash';

/**
 * Todolist Loaded Action creator
 * @param todos
 * @returns {{type: string, config: any}}
 */
export function todoListLoaded(todos: Object, id: string) {
    return {
        type: Actions.ACTION_TODOLIST_LOADED,
        todos,
        id
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
export function todoListRequest(id) {
    return {
        type: Actions.ACTION_TODOLIST_REQUEST,
        id
    };
}

export function todoListVisibility(visibility: string) {
    return {
        type: Actions.ACTION_TODOLIST_VISIBILITY,
        visibility
    };
}
