import { createStore, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router'
import { syncHistory } from 'react-router-redux';
import rootReducer from '../reducers';
import * as thunkMiddleware from 'redux-thunk';
import * as createLogger from 'redux-logger';

const logger = createLogger() as any;
const reduxRouterMiddleware = syncHistory(browserHistory);

const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware, thunkMiddleware as any, logger)(createStore);

const store = createStoreWithMiddleware(rootReducer);

// Required for replaying actions from devtools to work
reduxRouterMiddleware.listenForReplays(store);

export default store;
