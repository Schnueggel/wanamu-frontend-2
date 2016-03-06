import { createStore, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
import * as thunkMiddleware from 'redux-thunk';
import * as createLogger from 'redux-logger';

const logger = (createLogger as any)() ;

const createStoreWithMiddleware = applyMiddleware(routerMiddleware(browserHistory), thunkMiddleware as any, logger)(createStore);

const store = createStoreWithMiddleware(rootReducer);

export default store;
