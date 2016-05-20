import * as Actions from './index';

export function menuOpen(): any {
    return  {
        type: Actions.ACTION_MENU_OPEN
    };
}

export function menuToggle(): any {
    return  {
        type: Actions.ACTION_MENU_TOGGLE
    };
}

export function appError(error): any {
    return  {
        type: Actions.ACTION_APP_ERROR,
        error
    };
}

export function appClearError(error): any {
    return  {
        type: Actions.ACTION_APP_CLEAR_ERROR,
        error
    };
}

export function appStoreLastRequest(location, params={}): any {
    return {
        type: Actions.ACTION_APP_STORE_LAST_LOCATION,
        location,
        params
    };
}
