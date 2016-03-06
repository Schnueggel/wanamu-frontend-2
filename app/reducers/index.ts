import { combineReducers } from 'redux';
import * as Actions from '../actions/index';
import { routerReducer } from 'react-router-redux';
import { login } from './login';
import { auth } from './auth';
import { menu } from './menu';
import { friends } from './friends';
import { user } from './user';
import { register } from './register';
import { todolist } from './todolist';
import { app } from './app';

const rootReducer = combineReducers({
    register,
    user,
    todolist,
    app,
    login,
    auth,
    friends,
    menu,
    routing: routerReducer
});

export default rootReducer;
