import * as React from 'react';
import Menu from './Menu/Menu';
import AppState, {AppStateModel} from '../models/state/AppStateModel';
import authService from '../services/AuthService';
import {User} from '../models/data/User';

interface PageProps {
    children: any
}

export default class Page extends React.Component<PageProps, AppStateModel> {

    private currentUserLoaded:boolean = false;

    constructor(props:PageProps) {
        super(props);
        this.state = AppState;
    }

    componentWillMount() {
        this.state.triedToLoadUser = false;
        authService
            .createCurrentUserRequestStream()
            .finally(() => {
                this.setState({
                    triedToLoadUser: true
                } as any);
            })
            .subscribe((user:wu.model.data.IUser) => {
                if (user instanceof User) {
                    this.state.login.user = user;
                }
            });
    }

    render() {
        if (this.state.triedToLoadUser) {
            return (
                <div>
                    <div>
                        <h1>Wanamu Page!!!</h1>
                    </div>
                    <nav>
                        <Menu {...this.state.menu}/>
                    </nav>
                    <div className="container">
                        {this.props.children}
                    </div>
                </div>
            );
        }
        return null;
    }
}
