import * as React from 'react';
import {Router, browserHistory} from 'react-router';
import routes from 'config/routes';
import {Provider} from 'react-redux';
import store from './stores/appStore';
import 'isomorphic-fetch';
import {syncHistoryWithStore} from 'react-router-redux';

interface IProps {
    path?: string;
}

export class App extends React.Component<IProps,any> {
    render() {
        const history = syncHistoryWithStore(browserHistory as any, store as any) as any;

        return (
            <Provider store={store}>
                <Router history={history}>
                    {routes(this.props.path)}
                </Router>
            </Provider>
        );
    }
}

