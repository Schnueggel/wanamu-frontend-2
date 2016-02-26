import { ACTION_USER_LOADED, ACTION_USER_CLEAR} from '../actions/index';
import { Menus } from '../constants';

const initialState = {
    menuItems: Menus.noAuthMenuItems
};

export function menu(state = initialState, action: any) {
    switch (action.type) {
        case ACTION_USER_LOADED:
            return Object.assign({}, state, {menuItems: Menus.authMenuItems});
        case ACTION_USER_CLEAR:
            return Object.assign({}, state, {menuItems: Menus.noAuthMenuItems});
        default:
            return state;
    }
}
