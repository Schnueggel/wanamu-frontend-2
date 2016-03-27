require('normalize.css/normalize.css');
require('./styles/index.css');

import * as React from 'react';
import * as ReactDom from 'react-dom';
import store from './stores/appStore';
import { bootstrap } from './actions/BootstrapActions';
import { AppStates } from './constants';
import { App } from './App';

export function init() {
    //Bootstrap Application by waiting for all necessary information
    const unsubscribe = store.subscribe(() => {
        if (store.getState().app.appState === AppStates.Error) {
            unsubscribe();
            ReactDom.render(
                <div className="bootstrap-error">
                    <div className="message"> Failed to Bootstrap Application! Refresh the Page to retry.</div>
                    <div className="error-message">
                        {store.getState().app.error}
                    </div>
                </div>,
                document.getElementById('app')
            );
        } else if (store.getState().app.appState === AppStates.Ready) {
            unsubscribe();

            ReactDom.render(
                <App/>,
                document.getElementById('app')
            );
        }
    });
}

export function doBootstrap() {
    store.dispatch(bootstrap());
}

init();
doBootstrap();
