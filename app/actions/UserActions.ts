import * as Actions from './index';
import { LocalStorage } from '../constants';


export function userLoaded(user) {
    return  {
        type: Actions.ACTION_USER_LOADED,
        user
    };
}

export function userRequest() {
    return {
        type: Actions.ACTION_USER_REQUEST
    }
}

export function userClear() {
    return {
        type: Actions.ACTION_USER_CLEAR
    }
}