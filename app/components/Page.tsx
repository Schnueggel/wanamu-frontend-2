import * as React from 'react';
import Menu from './Menu/Menu';
import AppState, {AppStateModel} from '../models/state/AppStateModel';
import authService from '../services/AuthService';
import {User} from '../models/data/User';
import {NetworkError} from "../errors/NetworkError";

interface PageProps {
    children: any,
    appState: AppStateModel;
    history: History
}

export default class Page extends React.Component<PageProps, any> {

    constructor(props:PageProps) {
        super(props);
    }

    componentWillMount() {
        authService
            .createCurrentUserRequestStream()
            .subscribe((user:wu.model.data.IUser) => {
                if (user instanceof User) {
                    this.props.appState.login.user = user;
                } else {
                    this.props.history.pushState(null, '/login');
                }
            });
    }

    render() {
        return (
            <div className="mdl-layout__container">
                <div className="wu-theme-1 mdl-layout mdl-js-layout">
                    <header className="mdl-layout__header mdl-layout__header--transparent">
                        <div className="mdl-layout__header-row">
                            <span className="mdl-layout-title">Wanamu</span>
                            <div className="mdl-layout-spacer"></div>
                        </div>
                    </header>
                    <Menu {...this.props.appState.menu} title="Wanamu" />
                    <div className="mdl-layout__content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
