import * as React from 'react';
import Menu from 'components/Menu/Menu';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import * as classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { menuToggle } from '../actions/AppAction';
import { Spinner } from './../components/Elements/Spinner';
import DevTools from './DevTools';
import {Icon} from '../components/Elements/Icon';
import {NotificationPopup} from '../components/Notifications/NotificationPopup';

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
        {text: 'Friends', url: ' /friends'},
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
    
    showNotificationMenu(){
        
    }

    render() {
        const menuOpen = classNames({open: this.props.app.menuOpen}),
            classLoading = classNames({hidden: !this.props.app.isLoading }),
            menuIconClasses = classNames('icon', 'material-icons', {
                info: this.props.user.invitations  > 0
            });

        let error;

        if (this.props.app.error) {
            error = <div className="error-message">{this.props.app.error}</div>;
        }

        return (
            <div className="layout__container">
                <div className="layout">
                    <header className="header">
                        <div className="header-row">
                            <i className={menuIconClasses} onClick={this.props.actions.menuToggle}>menu</i>
                            <h1 className="title">Wanamu</h1>
                            <div className="spacer"></div>
                            <Spinner className={classLoading}/>
                            <Icon name="notification_active" onClick={this.showNotificationMenu.bind(this)}></Icon>
                        </div>
                    </header>
                    <Menu title="Wanamu" items={this.props.menu.menuItems} className={menuOpen}/>
                    <div className={`menu-overlay ${menuOpen}`} onClick={this.props.actions.menuToggle}></div>
                    <div className="layout__content">
                        {error}
                        {this.props.children}
                    </div>
                </div>
                <NotificationPopup
                    visible={this.props.app.isNotificationPopupVisible}
                />       
                {getDevTools()}
            </div>
        );
    }
}

function mapStateToProps(state: wu.IState) {
    return {
        app: state.app,
        user: state.user,
        menu: state.menu
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            routerActions,
            menuToggle: bindActionCreators(menuToggle, dispatch)
        }
    };
}


function getDevTools() {
    if (DevTools) {
        return <DevTools/>
    }
    return null;
}

const connectedPage = connect(mapStateToProps, mapDispatchToProps)(Page);

export default connectedPage;
