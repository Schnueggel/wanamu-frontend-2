import * as React from 'react';
import Menu from 'components/Menu/Menu';
import {userAction} from 'actions/UserAction';

interface PageProps extends wu.IControlProps<PageProps> {}

/**
 * Laoyout for the Page
 * @class Page
 * @namespace wu.components
 */
export default class Page extends React.Component<PageProps, any> {

    constructor(props:PageProps) {
        super(props);
    }

    componentWillMount() {
        if (!this.props.appState.login.user) {
            userAction.doUser();
        }
    }

    componentWillReceiveProps() {
        if (!this.props.appState.login.user && this.props.appState.isAuthedPath(this.props.location.pathname)) {
            this.props.history.pushState(null, '/login');
        }
    }

    render() {
        return (
            <div className="wu-theme-1 mdl-layout__container">
                <div className="mdl-layout mdl-js-layout">
                    <header className="mdl-layout__header mdl-layout__header--transparent">
                        <div className="mdl-layout__header-row">
                            <span className="mdl-layout-title">Wanamu</span>
                            <div className="mdl-layout-spacer"></div>
                            <div class="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active" is hide={!this.props.appState.todos.isTodoUpdating}></div>
                        </div>
                    </header>
                    <Menu title="Wanamu" items={this.props.appState.menuItems}/>
                    <div className="mdl-layout__content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
