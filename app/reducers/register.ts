import * as Actions from '../actions/index';

const initalState = {
    error     : null,
    isLoading : false,
    user      : null,
    formErrors: null
};

export function register(state = initalState, action: any) {
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
        default:
            return state;
    }
}
