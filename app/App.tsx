import * as React from 'react';
import * as ReactDom from 'react-dom';
import * as ReactRouter from 'react-router';
import routes from './config/routes';

ReactDom.render(
    <ReactRouter.Router>{routes}</ReactRouter.Router>,
    document.getElementById('app')
);