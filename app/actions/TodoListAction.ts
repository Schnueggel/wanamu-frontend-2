import * as Actions from './index';

/**
 * Todolist Loaded Action creator
 * @param todos
 * @param id
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
