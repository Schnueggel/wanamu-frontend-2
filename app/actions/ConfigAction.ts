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
        type: Actions.ACTION_CONFIG_LOADED_ERROR,
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
        return fetch('./config.json')
            .then( response => response.json())
            .then( config => dispatch(configLoaded(config)))
            .catch( err => configError(err))
    }
}