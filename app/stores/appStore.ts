import { createStore, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk';
import * as createLogger from 'redux-logger';
import {Store} from 'redux/index';

const  middleware = [routerMiddleware(browserHistory as any), thunkMiddleware as any];

if (createLogger) {
    middleware.push(createLogger());
}
const store = createStore(
    rootReducer,
    applyMiddleware(...middleware)
) as Store<any>;

export default store;
