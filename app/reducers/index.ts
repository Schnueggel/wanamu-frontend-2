import { combineReducers } from 'redux';
import * as Actions from '../actions/index';
import { routeReducer, UPDATE_LOCATION } from 'redux-simple-router';
import { login } from './login';
import { auth } from './auth';
import { user } from './user';
import { register } from './register';
import { todolist } from './todolist';
import { AppStates } from '../constants';

const initialState = {
    appState     : AppStates.Booting,
    error        : null,
    isLoading    : false,
    isSigningIn     : false,
    configLoading: false,
    config       : null,
    configError  : null,
    menuOpen     : false
};

function app(state = initialState, action: any) {
    const { type, error } = action;
    switch (type) {
        case Actions.ACTION_BOOTING:
            return Object.assign({}, state, {appState: AppStates.Booting});
        case Actions.ACTION_BOOTING_FINISHED:
            return Object.assign({}, state, {appState: AppStates.Ready});
        case Actions.ACTION_BOOTING_ERROR:
            return Object.assign({}, state, {appState: AppStates.Error});
        case Actions.ACTION_CONFIG_REQUEST:
            return Object.assign({}, state, {configLoading: true});
        case Actions.ACTION_CONFIG_LOADED:
            return Object.assign({}, state, {
                config     : action.config,
                configError: null,
                appState   : AppStates.Ready,
                error      : null
            });
        case Actions.ACTION_CONFIG_ERROR:
            return Object.assign({}, state, {
                configError: error,
                error,
                appState   : AppStates.Error
            });
        case Actions.ACTION_MENU_TOGGLE:
            return Object.assign({}, state, {
                menuOpen: !state.menuOpen
            });
        case UPDATE_LOCATION:
            return Object.assign({}, state, {
                menuOpen: false
            });
        case Actions.ACTION_LOGIN_REQUEST:
            return Object.assign({}, state, {
                isSigningIn: true
            });
        case Actions.ACTION_APP_ERROR:
            return Object.assign({}, state, {
                error: error
            });
        case Actions.ACTION_APP_CLEAR_ERROR:
            return Object.assign({}, state, {
                error: null
            });
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    register,
    user,
    todolist,
    app,
    login,
    auth,
    routing: routeReducer
});

export default rootReducer;