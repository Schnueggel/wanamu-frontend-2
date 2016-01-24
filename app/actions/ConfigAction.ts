import * as fetch from 'isomorphic-fetch';
import * as Actions from './index';

/**
 * Config Loaded Action creator
 * @param config
 * @returns {{type: string, config: any}}
 */
export function configLoaded(config: Object) {
    return {
        type: Actions.ACTION_CONFIG_LOADED,
        config
    };
}

/**
 * Config Error action creator
 * @param error
 * @returns {{type: string, error: any}}
 */
export function configError(error: string) {
    return {
        type: Actions.ACTION_CONFIG_ERROR,
        error
    };
}

/**
 * Config Request action
 * @returns {{type: string}}
 */
export function configRequest() {
    return {
        type: Actions.ACTION_CONFIG_REQUEST
    }
}

/**
 * Loads the config from the backend
 * @returns {function(any): Promise<TResult>|Promise<U>}
 */
export function configLoad() {
    return (dispatch) => {
        dispatch(configRequest());
        return fetch('/config.json')
            .then( response => {
                if ([304, 200].indexOf(response.status) > -1) {
                    return response.json();
                } else {
                    dispatch(configError('Unable to load application config from server'));
                }
            })
            .then( config => {
                dispatch(configLoaded(config));
            })
            .catch(err => console.error(err))
    }
}