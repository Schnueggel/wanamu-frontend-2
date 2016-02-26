import * as Actions from './index';
import * as fetch from 'isomorphic-fetch';
import * as _ from 'lodash';
import { defaultRequestOptions, LocalStorage } from '../constants';
import { tokenClear } from './TokenActions';
import { userClear } from './UserActions';


export function logout() {
    return dispatch => {
        dispatch(tokenClear());
        dispatch(userClear());
    };
}
