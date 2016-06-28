import * as Actions from './index';

/**
 * @returns {{type: string}}
 */
export function todoUpdate(todo): any {
    return {
        type: Actions.ACTION_TODO_UPDATE,
        todo
    };
}

/**
 * @returns {{type: string}}
 */
export function todoError(error, todo): any {
    return {
        type: Actions.ACTION_TODO_ERROR,
        error,
        todo
    };
}

export function todoUpdateRequest(todo): any {
    return {
        type: Actions.ACTION_TODO_UPDATE_REQUEST,
        todo
    };
}

export function todoUpdateRequestSuccess(todo): any {
    return {
        type: Actions.ACTION_TODO_UPDATE_SUCCESS,
        todo
    };
}

export function todoUpdateRequestError(error: string, todo): any {
    return {
        type: Actions.ACTION_TODO_UPDATE_REQUEST_ERROR,
        error,
        todo
    };
}

export function todoCreateSuccess(todo) : any {
    return {
        type: Actions.ACTION_TODO_CREATE_SUCCESS,
        todo
    };
}

export function todoCreateRequestError(error, todo: wu.model.data.ITodo) {
    return {
        type: Actions.ACTION_TODO_CREATE_REQUEST_ERROR,
        error,
        todo
    };
}

export function todoCreateRequest(todo: wu.model.data.ITodo) {
    return {
        type: Actions.ACTION_TODO_CREATE_REQUEST,
        todo
    };
}

export function todoCreate(todo: wu.model.data.ITodo) {
    return {
        type: Actions.ACTION_TODO_CREATE,
        todo
    };
}

/**
 * ####################################################################################################################
 * ####################################################################################################################
 * Delete Todo
 * ####################################################################################################################
 * ####################################################################################################################
 */

export function todoDelete(todo) {
    return {
        type: Actions.ACTION_TODO_DELETE,
        todo
    };
}

export function todoDeleteRequest(todo) {
    return {
        type: Actions.ACTION_TODO_DELETE_REQUEST,
        todo
    };
}

export function todoDeleteRequestSuccess(todo) {
    return {
        type: Actions.ACTION_TODO_DELETE_SUCCESS,
        todo
    };
}

export function todoDeleteRequestError(error: string, todo) {
    return {
        type: Actions.ACTION_TODO_DELETE_REQUEST_ERROR,
        error,
        todo
    };
}

/**
 * ####################################################################################################################
 * ####################################################################################################################
 * Finish Todo
 * ####################################################################################################################
 * ####################################################################################################################
 */

export function todoFinish(todo) {
    return {
        type: Actions.ACTION_TODO_FINISH,
        todo
    };
}

export function todoFinishRequest(todo) {
    return {
        type: Actions.ACTION_TODO_FINISH_REQUEST,
        todo
    };
}

export function todoFinishRequestSuccess(todo) {
    return {
        type: Actions.ACTION_TODO_FINISH_SUCCESS,
        todo
    };
}

export function todoFinishRequestError(error: string, todo) {
    return {
        type: Actions.ACTION_TODO_FINISH_REQUEST_ERROR,
        error,
        todo
    };
}

export function todoViewChange(todo) {
    return {
        type: Actions.ACTION_TODO_VIEW_CHANGE,
        todo
    };
}
