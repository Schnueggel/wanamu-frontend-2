import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router'
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk';
import * as createLogger from 'redux-logger';
import DevTools from '../containers/DevTools';
import createSagaMiddleware from 'redux-saga';
import rootSaga from 'sagas';

const sagaMiddleWare = createSagaMiddleware();
const  middleware = [routerMiddleware(browserHistory as any), thunkMiddleware as any, sagaMiddleWare];

// Remove on production build
if (typeof createLogger === 'function') {
    middleware.push(createLogger());
}

const composeFunctions = [applyMiddleware(...middleware)];

if (DevTools) {
    composeFunctions.push(DevTools.instrument());
}

const enhancer = compose(...composeFunctions);

const store = createStore(
    rootReducer,
    {},
    enhancer
);

sagaMiddleWare.run(rootSaga as any);

if (module.hot) {
    module.hot.accept('../reducers', () =>
        store.replaceReducer(rootReducer)
    );
}

export default store as Redux.Store;
