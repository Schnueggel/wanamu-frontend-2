import * as Actions from './index';
import {configRequest, configLoad} from './ConfigAction';

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

export function userLoaded(user) {
    return  {
        type: Actions.ACTION_USER_LOADED,
        user
    };
}