import * as  React from 'react';
import Page from '../containers/Page';
import Login from '../containers/Login';
import TodoList from '../containers/TodoList';
import Logout from '../containers/Logout';
import Register from '../containers/Register';
import Friends from '../containers/Friends';
import { Route, IndexRoute } from 'react-router';

export default (
    <Route path="/" component={Page}>
        <IndexRoute component={Login} />
        <Route path="login" component={Login}/>
        <Route path="register" component={Register}/>
        <Route path="todolist(/:id)" component={TodoList}/>
        <Route path="logout" component={Logout}/>
        <Route path="friends" component={Friends}/>
    </Route>
);
