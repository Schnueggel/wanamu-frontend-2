import * as Actions from '../actions/index';
import { UserNameCheck } from '../constants';

const initialState: wu.IRegisterState = {
    error             : null,
    isLoading         : false,
    user              : null,
    formErrors        : null,
    usernameState     : UserNameCheck.Unkown,
    isUserCheckLoading: false
};

export function register(state = initialState, action: any) {
    const { type, error, user } = action;

    switch (type) {
        case Actions.ACTION_REGISTER_REQUEST:
            return Object.assign({}, state, {isLoading: true, error: null});
        case Actions.ACTION_REGISTERED:
            return Object.assign({}, state, {error: null, isLoading: false, user});
        case Actions.ACTION_REGISTER_ERROR:
            return Object.assign({}, state, {error, isLoading: false});
        case Actions.ACTION_REGISTER_FORM_ERROR:
            return Object.assign({}, state, {formErrors: null, isLoading: false});
        case Actions.ACTION_REGISTER_USERNAME_CHECK:
            return Object.assign({}, state, {userCheck: action.state, isUserCheckLoading: false});
        case Actions.ACTION_REGISTER_USERNAME_CHECK_REQUEST:
            return Object.assign({}, state, {isUserCheckLoading: true});
        default:
            return state;
    }
}
