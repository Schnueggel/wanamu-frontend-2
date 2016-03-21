require('normalize.css/normalize.css');
require('./styles/index.css');

import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from 'config/routes';
import { Provider } from 'react-redux';
import store from './stores/appStore';
import { syncHistoryWithStore } from 'react-router-redux'
import { bootstrap } from './actions/BootstrapActions';
import { AppStates } from './constants';

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

            const history = syncHistoryWithStore(browserHistory, store);

            ReactDom.render(
                <Provider store={store}>
                    <Router history={history}>
                        {routes}
                    </Router>
                </Provider>,
                document.getElementById('app')
            );
        }
    });
}

export function bootstrap() {
    store.dispatch(bootstrap());
}


init();
bootstrap();
