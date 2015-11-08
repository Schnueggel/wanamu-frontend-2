import * as  React from 'react';
import Page from '../components/Page';
import Login from '../components/Login';
import Todos from '../components/Todos';
import {Route, IndexRoute} from 'react-router';

export default (
    <Route path="/" component={Page}>
        <IndexRoute component={Login} />
        <Route path="login" component={Login}/>
        <Route path="todos" component={Todos}/>
    </Route>
)
