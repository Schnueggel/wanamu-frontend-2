require('normalize.css');
require('./styles/index.css');

import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from 'config/routes';
import {bootstrap} from './actions/BootstrapAction';
import { Provider } from 'react-redux';

import store from './stores/appStore';

ReactDom.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            {routes}
        </Router>
    </Provider>,
    document.getElementById('app')
);

store.dispatch(bootstrap());