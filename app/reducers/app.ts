import * as Actions from '../actions/index';
import { AppStates } from '../constants';
import { LOCATION_CHANGE } from 'react-router-redux';

const initialState: wu.IAppState = {
    appState      : AppStates.Booting,
    error         : null,
    isLoading     : false,
    loadingCounter: 0,
    isSigningIn   : false,
    configLoading : false,
    config        : null,
    configError   : null,
    menuOpen      : false,
    failedLocation: null,
    userTested    : false
};

export function app(state = initialState, action: any) {
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
                error      : null
            });
        case Actions.ACTION_USER_TESTED: {
            return Object.assign({}, state, {
                userTested: true
            });
        }
        case Actions.ACTION_APP_STORE_LAST_LOCATION:
            return Object.assign({}, state, {failedLocation: action.location});
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
        case LOCATION_CHANGE:
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