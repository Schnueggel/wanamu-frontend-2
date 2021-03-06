import * as fetch from 'isomorphic-fetch';
import * as Actions from './index';
import { defaultRequestOptions } from '../constants';
import { appError } from './AppAction';
import * as _ from 'lodash';
import {responseStatusCheck} from './actions';
import {Dispatch} from 'redux/index';

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

/**
 * Updates a todo
 *
 * @returns {function(any): Promise<TResult>|Promise<U>}
 */
export function todoDoUpdate(todo: wu.model.data.ITodo): any {
    return (dispatch: Dispatch<any>, getState: () => any) => {
        dispatch(todoUpdateRequest(todo));
        const options = defaultRequestOptions(getState().auth.token, 'PUT');

        options.body = JSON.stringify(todo);

        return fetch(`${getState().app.config.WU_API_BASE_URL}/todo/${todo._id}`, options)
            .then((response: IResponse) => responseStatusCheck(response, dispatch))
            .then((response: IResponse) => {
                if ([304, 200].indexOf(response.status) > -1) {
                    return response.json();
                } else if (response.status === 422) {
                    throw new Error('Invalid Request');
                } else {
                    throw new Error('Updating todo failed');
                }
            })
            .then( data => {
                return _.get(data, 'data[0]');
            })
            .then( todo => {
                if (_.has(todo, '_id')) {
                    dispatch(todoUpdateRequestSuccess(todo));
                    dispatch(todoUpdate(todo));
                } else {
                    dispatch(todoUpdateRequestError('No data found', todo));
                }
            })
            .catch(err => {
                dispatch(todoUpdateRequestError(err.message, todo));
            });
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

export function todoDoCreate(todo: wu.model.data.ITodo) {
    return (dispatch: Dispatch<any>, getState: () => any) => {
        dispatch(todoCreateRequest(todo));
        const options = defaultRequestOptions(getState().auth.token, 'POST');

        options.body = JSON.stringify(todo);

        return fetch(`${getState().app.config.WU_API_BASE_URL}/todo/${todo.todolistId}`, options)
            .then( response => {
                if ([304, 200].indexOf(response.status) > -1) {
                    return response.json();
                } else if ([422, 400].indexOf(response.status) > -1) {
                    throw new Error('Invalid Request');
                } else if (response.status === 404) {
                    throw new Error('No data found');
                } else if (response.status === 401) {
                    dispatch(appError('You need to login'));
                    return null;
                } else if (response.status === 500) {
                    throw new Error('Server error');
                } else if (response.status === 403) {
                    throw new Error('Not enough rights to see this data');
                } else if (response.status === 0) {
                    throw new Error('Please check your network connection');
                } else {
                    throw new Error('Creating todo failed');
                }
            })
            .then( data => {
                return _.get(data, 'data[0]');
            })
            .then( (todo: wu.model.data.ITodo) => {
                if (_.has(todo, '_id')) {
                    dispatch(todoCreateSuccess(todo));
                    dispatch(todoCreate(todo));
                } else {
                    dispatch(todoCreateRequestError('No data found', todo));
                }
            })
            .catch(err => {
                dispatch(todoCreateRequestError(err.message, todo));
            });
    }
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

export function todoDoDelete(todo: wu.model.data.ITodo) {
    return (dispatch: Dispatch<any>, getState: () => any) => {
        dispatch(todoDeleteRequest(todo));
        const options = defaultRequestOptions(getState().auth.token, 'DELETE');

        options.body = JSON.stringify(todo);

        return fetch(`${getState().app.config.WU_API_BASE_URL}/todo/${todo._id}`, options)
            .then( response => {
                if ([304, 200].indexOf(response.status) > -1) {
                    return response.json();
                } else if ([422, 400].indexOf(response.status) > -1) {
                    throw new Error('Invalid Request');
                } else if (response.status === 404) {
                    throw new Error('No data found');
                } else if (response.status === 401) {
                    dispatch(appError('You need to login'));
                    return null;
                } else if (response.status === 500) {
                    throw new Error('Server error');
                } else if (response.status === 403) {
                    throw new Error('Not enough rights to see this data');
                } else if (response.status === 0) {
                    throw new Error('Please check your network connection');
                } else {
                    throw new Error('Deleting todo failed');
                }
            })
            .then( () => {
                dispatch(todoDeleteRequestSuccess(todo));
            })
            .catch(err => {
                dispatch(todoDeleteRequestError(err.message, todo));
            });
    }
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

export function todoDoFinish(todo: wu.model.data.ITodo) {
    return (dispatch: Dispatch<any>, getState: () => wu.IState) => {
        dispatch(todoFinishRequest(todo));
        const options = defaultRequestOptions(getState().auth.token, 'PUT');

        options.body = JSON.stringify(todo);

        return fetch(`${getState().app.config.WU_API_BASE_URL}/todo/${todo._id}/finish`, options)
            .then( response => {
                if ([304, 200].indexOf(response.status) > -1) {
                    return response.json();
                } else if ([422, 400].indexOf(response.status) > -1) {
                    throw new Error('Invalid Request');
                } else if (response.status === 404) {
                    throw new Error('No data found');
                } else if (response.status === 401) {
                    dispatch(appError('You need to login'));
                    return null;
                } else if (response.status === 500) {
                    throw new Error('Server error');
                } else if (response.status === 403) {
                    throw new Error('Not enough rights to see this data');
                } else if (response.status === 0) {
                    throw new Error('Please check your network connection');
                } else {
                    throw new Error('Finishing todo failed');
                }
            })
            .then( data => {
                return _.get(data, 'data[0]');
            })
            .then( (todo: wu.model.data.ITodo) => {
                if (_.has(todo, '_id')) {
                    dispatch(todoFinishRequestSuccess(todo));
                } else {
                    dispatch(todoFinishRequestError('No data found', todo));
                }
            })
            .catch(err => {
                dispatch(todoFinishRequestError(err.message, getState().todolist.todos.get(todo._id)));
            });
    }
}

export function todoViewChange(todo) {
    return {
        type: Actions.ACTION_TODO_VIEW_CHANGE,
        todo
    };
}
