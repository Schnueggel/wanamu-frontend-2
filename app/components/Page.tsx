import * as React from 'react';
import Menu from 'components/Menu/Menu';
import { connect } from 'react-redux';
import { routeActions } from 'redux-simple-router';
import { AppStates } from '../constants';
import * as classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { menuToggle } from '../actions/AppAction';
import { Spinner } from './Elements/Spinner';

/**
 * Laoyout for the Page
 * @class Page
 * @namespace wu.components
 */
export class Page extends React.Component<wu.IPageProps, any> implements React.ComponentLifecycle<wu.IPageProps, any> {
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

    render() {
        if (this.props.app.appState === AppStates.Booting) {
            return <div>Loading...</div>
        } else if(this.props.app.appState === AppStates.Error) {
            return <div>this.props.app.error</div>
        }

        const menuOpen = classNames({open: this.props.app.menuOpen});
        const classLoading = classNames({hidden: !this.props.app.isLoading });

        let error;

        if (this.props.app.error) {
            error = <div class="error-message">{this.props.app.error}</div>;
        }

        return (
            <div className="mdl-layout__container">
                <div className="mdl-layout mdl-js-layout">
                    <header className="header">
                        <div className="header-row">
                            <i className="material-icons icon" onClick={this.props.menuToggle}>menu</i>
                            <h1 className="title">Wanamu</h1>
                            <div className="spacer"></div>
                            <Spinner className={classLoading}/>
                        </div>
                    </header>
                    <Menu title="Wanamu" items={ this.props.user.user ? this.authMenuItems : this.noAuthMenuItems } className={menuOpen}/>
                    <div className={`menu-overlay ${menuOpen}`} onClick={this.props.menuToggle}></div>
                    <div className="mdl-layout__content">
                        {error}
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        app: state.app,
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        routeActions,
        menuToggle: bindActionCreators(menuToggle, dispatch)
    };
}

const connectedPage = connect(mapStateToProps, mapDispatchToProps)(Page);

export default connectedPage;