import * as React from 'react';
import {Router, browserHistory} from 'react-router';
import routes from 'config/routes';
import {Provider} from 'react-redux';
import store from './stores/appStore';
import {syncHistoryWithStore} from 'react-router-redux'

export class App extends React.Component<any,any> {
    render() {
        const history = syncHistoryWithStore(browserHistory, store);

        return (
            <Provider store={store}>
                <Router history={history}>
                    {routes}
                </Router>
            </Provider>
        );
    }
}
