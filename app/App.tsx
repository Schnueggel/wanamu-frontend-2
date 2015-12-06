//require('material-design-lite/material.css');
require('./styles/index.css');
//require('material-design-lite/material.js');

import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Router } from 'react-router';
import routes from 'config/routes';
import { AppState } from 'models/states/AppStateModel';
import { bootstrapAction } from 'actions/BootstrapAction';

const createBrowserHistory = require('history/lib/createBrowserHistory');

const app = document.getElementById('app'),
    history = createBrowserHistory();

AppState.changeStateStream.subscribe((state: wu.model.states.IAppStateModel) => {
    if (state.appReady) {
        ReactDom.render(
            <Router createElement={createElement} history={history}>
                {routes}
            </Router>,
            app
        );
    } else if (state.isBootstrapping) {
        ReactDom.render(
            <div>Loading...</div>,
            app
        );
    } else if (state.bootstrappingError){
        ReactDom.render(
            <div>{state.bootstrappingError.message}</div>,
            app
        );
    }
});

bootstrapAction.doBootstrap();

/**
 * Function to decorate route components with the property appState
 * @param Component
 * @param props
 * @returns {any}
 */
function createElement(Component, props){
    props.appState = AppState;
    return <Component {...props} />;
}