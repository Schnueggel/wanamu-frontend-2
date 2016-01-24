import * as  React from 'react';
import Page from 'components/Page';
import Login from 'components/Login';
import TodoList from 'components/TodoList';
import Logout from 'components/Logout';
import Register from 'components/Register';
import { Route, IndexRoute } from 'react-router';

export default (
    <Route path="/" component={Page}>
        <IndexRoute component={Login} />
        <Route path="login" component={Login}/>
        <Route path="register" component={Register}/>
        <Route path="todolist(/:id)" component={TodoList}/>
        <Route path="logout" component={Logout}/>
    </Route>
);
