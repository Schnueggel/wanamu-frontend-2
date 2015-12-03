import * as  React from 'react';
import Page from 'components/Page';
import Login from 'components/Login';
import TodoList from 'components/TodoList';
import Register from 'components/Register';
import {Route, IndexRoute} from 'react-router';

function upgradeDom() {
    setTimeout(() => {
        componentHandler.upgradeDom();
    }, 400);
}

export default (
    <Route path="/" component={Page} onEnter={upgradeDom}>
        <IndexRoute component={Login} />
        <Route path="login" component={Login} onEnter={upgradeDom}/>
        <Route path="register" component={Register} onEnter={upgradeDom}/>
        <Route path="todolist(/:id)" component={TodoList} onEnter={upgradeDom}/>
    </Route>
);
