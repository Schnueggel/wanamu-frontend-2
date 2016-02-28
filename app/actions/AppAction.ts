import * as Actions from './index';
import { configRequest, configLoad } from './ConfigActions';

export function menuOpen() {
    return  {
        type: Actions.ACTION_MENU_OPEN
    };
}

export function menuToggle() {
    return  {
        type: Actions.ACTION_MENU_TOGGLE
    };
}

export function appError(error) {
    return  {
        type: Actions.ACTION_APP_ERROR,
        error
    };
}

export function appClearError(error) {
    return  {
        type: Actions.ACTION_APP_CLEAR_ERROR,
        error
    };
}

export function appStoreLastRequest(location, params={}) {
    return {
        type: Actions.ACTION_APP_STORE_LAST_LOCATION,
        location,
        params
    };
}