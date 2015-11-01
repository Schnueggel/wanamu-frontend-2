import * as  React from 'react';
import Page from '../components/Page';
import Login from '../components/Login';
import {Route, IndexRoute} from 'react-router';

//Hack to make webpack import Page Component. For some reasons webpack creates a require for Login Component but not for the Page Component
const p = Page;

export default (
    <Route path="/" component={Page}>
        <IndexRoute component={Login} />
        <Route path="login" component={Login}/>
    </Route>
)
