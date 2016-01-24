import { combineReducers } from 'redux';
import * as Actions from '../actions/index';
import { routeReducer } from 'redux-simple-router';
import { login } from './login';
import { auth } from './auth';
import { todolist } from './todolist';
import { AppStates } from '../constants';

const initialState = {
    appState     : AppStates.Booting,
    error        : null,
    isLoading    : false,
    user         : null,
    userLoading  : false,
    configLoading: false,
    config       : null,
    configError  : null,
    menuOpen     : false,
    token        : null
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
        case Actions.ACTION_CONFIG_LOADED_ERROR:
            return Object.assign({}, state, {
                configError: error,
                error,
                appState   : AppStates.Error
            });
        case Actions.ACTION_MENU_TOGGLE:
            return Object.assign({}, state, {
                menuOpen: !state.menuOpen
            });
        case Actions.ACTION_USER_LOADED:
            return Object.assign({}, state, {
                userLoading: false,
                error      : null,
                user       : action.user
            });
        case Actions.ACTION_LOGIN_REQUEST:
            return Object.assign({}, state, {
                userLoading: true
            });
        case Actions.ACTION_APP_ERROR:
            return Object.assign({}, state, {
                error: action.error
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
    todolist,
    app,
    login,
    auth,
    routing: routeReducer
});

export default rootReducer;