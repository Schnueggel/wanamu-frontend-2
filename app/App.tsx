import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Router } from 'react-router';
import routes from './config/routes';

ReactDom.render(
    <Router>{routes}</Router>,
    document.getElementById('app')
);