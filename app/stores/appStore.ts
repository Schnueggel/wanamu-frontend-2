import { createStore, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk';
import * as createLogger from 'redux-logger';

const store = createStore(
    rootReducer,
    applyMiddleware(routerMiddleware(browserHistory), thunkMiddleware as any, (createLogger as any)())
);

export default store;
