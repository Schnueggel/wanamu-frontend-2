require('material-design-lite/material.css');
require('./styles/index.css');
require('material-design-lite/material.js');

import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Router } from 'react-router';
import routes from './config/routes';
import AppState from "./models/state/AppStateModel";

const app = document.getElementById('app');

AppState.changeStateStream.subscribe((state) => {
    console.log('AppState changed render app');
    ReactDom.render(
        <Router createElement={createElement}>{routes}</Router>,
        app
    );
});

AppState.changeStateStream.onNext(AppState);


function createElement(Component, props){
    props.appState = AppState;
    return <Component {...props} />;
}