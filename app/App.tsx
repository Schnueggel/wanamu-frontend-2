import {configLoad} from './actions/ConfigActions';
require('normalize.css');
require('./styles/index.css');

import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from 'config/routes';
import { Provider } from 'react-redux';
import store from './stores/appStore';
import { loadDefaultUser, bootstrap } from './actions/BootstrapActions';

ReactDom.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            {routes}
        </Router>
    </Provider>,
    document.getElementById('app')
);

const unsubscribe = store.subscribe(()=> {
    if (store.getState().app.config) {
        store.dispatch(loadDefaultUser());
        unsubscribe();
    }
});
store.dispatch(bootstrap());