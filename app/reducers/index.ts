import { combineReducers } from 'redux';
import * as Actions from '../actions/index';
import { routeReducer, UPDATE_LOCATION } from 'react-router-redux';
import { login } from './login';
import { auth } from './auth';
import { menu } from './menu';
import { user } from './user';
import { register } from './register';
import { todolist } from './todolist';
import { AppStates } from '../constants';

const initialState = {
    appState     : AppStates.Booting,
    error        : null,
    isLoading    : false,
    loadingCounter: 0,
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
        case Actions.ACTION_REGISTER_USERNAME_CHECK_REQUEST:
            return Object.assign({}, state, {
                loadingCounter: state.loadingCounter += 1,
                isLoading: true
            });
        case Actions.ACTION_REGISTER_USERNAME_CHECK:
        case Actions.ACTION_REGISTER_USERNAME_CHECK_ERROR:
            const count = Math.min(0,state.loadingCounter -= 1);
            return Object.assign({}, state, {
                loadingCounter: count,
                isLoading: count > 0
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
    menu,
    routing: routeReducer
});

export default rootReducer;
