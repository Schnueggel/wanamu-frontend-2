import * as  React from 'react';
import Page from '../components/Page';
import Login from '../components/Login';
import TodoList from '../components/TodoList';
import {Route, IndexRoute} from 'react-router';

export default (
    <Route path="/" component={Page}>
        <IndexRoute component={Login} />
        <Route path="login" component={Login}/>
        <Route path="todolist" component={TodoList}></Route>
        <Route path="todolist/:id" component={TodoList}/>
    </Route>
)
