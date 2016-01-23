import * as React from 'react';
import Menu from 'components/Menu/Menu';
import {userAction} from 'actions/UserAction';
import { connect } from 'react-redux';
import { routeActions } from 'redux-simple-router';
import { AppStates } from '../constants';

/**
 * Laoyout for the Page
 * @class Page
 * @namespace wu.components
 */
export class Page extends React.Component<wu.IPageProps, any> implements React.ComponentLifecycle<wu.IPageProps, any> {

    context: wu.IContext;

    /**
     * Menu items for authed user
     * @type {{text: string, url: string}[]}
     */
    authMenuItems: wu.IMenuItemData[] = [
        {text: 'Home', url: '/'},
        {text: 'TodoList', url: '/todolist'},
        {text: 'Logout', url: '/logout'}
    ];

    /**
     * Menu Items for non authed users
     * @type {{text: string, url: string}[]}
     */
    noAuthMenuItems: wu.IMenuItemData[] = [
        {text: 'Home', url: '/'},
        {text: 'Login', url: '/login'},
        {text: 'Register', url: '/register'}
    ];

    constructor(props: wu.IPageProps) {
        super(props);
    }

    componentWillReceiveProps(nextProps: wu.IPageProps) {
        console.log(this.context);
    }

    componentDidMount() {
        console.log(this.props);
    }

    render() {
        if (this.props.app.appState === AppStates.Booting) {
            return <div>Loading...</div>
        } else if(this.props.app.appState === AppStates.Error) {
            return <div>this.props.app.error</div>
        }
        return (
            <div className="wu-theme-1 mdl-layout__container">
                <div className="mdl-layout mdl-js-layout">
                    <header className="mdl-layout__header mdl-layout__header--transparent">
                        <div className="mdl-layout__header-row">
                            <span className="mdl-layout-title">Wanamu</span>
                            <div className="mdl-layout-spacer"></div>
                            <div class="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active" is="true" hide={!this.props.app.isLoading}></div>
                        </div>
                    </header>
                    <Menu title="Wanamu" items={ this.props.app.user ? this.authMenuItems : this.noAuthMenuItems }/>
                    <div className="mdl-layout__content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

const connectedPage = connect(state => state, routeActions as any)(Page);

export default connectedPage;