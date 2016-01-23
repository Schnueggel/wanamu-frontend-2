import * as React from 'react';
import {logoutAction} from 'actions/LogoutAction';
import {Button} from 'components/Elements/Button';

export interface ILogoutProps extends wu.IControlProps<ILogoutProps> {
    params: {
        id?: number
    }
}

/**
 * Controller Component
 * @class Logout
 * @namespace wu.components
 */
export default class Logout extends React.Component<ILogoutProps, any> {

    context: wu.IContext;

    constructor(props:ILogoutProps) {
        super(props);
    }

    componentWillMount() {
        logoutAction.doLogout();
    }

    componentWillUpdate() {
        if (this.props.appState.login.user === null) {
            this.context.router.push('login');
        }
    }

    render() {
        if (this.props.appState.login.isLoggingOut) {
            return (
                <div>
                    <h3>Logging out</h3>
                    <div className="mdl-spinner mdl-js-spinner is-active"></div>
                </div>
            )
        } else if (this.props.appState.login.logoutFailed) {
            return (<div>
                <h3>Logging out failed</h3>
                <Button onClick={ evt => logoutAction.doLogout()} text="Retry"/>
            </div>)
        }
        return null;
    }
}
