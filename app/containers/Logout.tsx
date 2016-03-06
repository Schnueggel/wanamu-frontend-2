import * as React from 'react';
import { logout } from 'actions/LogoutActions';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import { bindActionCreators } from 'redux';
/**
 * Controller Component
 * @class Logout
 * @namespace wu.components
 */
export class Logout extends React.Component<wu.ILogoutProps, any> implements React.ComponentLifecycle<wu.ILoginProps, any> {

    context: wu.IContext;

    constructor(props:wu.ILogoutProps) {
        super(props);
    }

    componentWillMount() {
        console.log(this.props.actions.logout());
        this.props.actions.routerActions.push('/login');
    }

    render() {
        return null;
    }
}
function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            routerActions: bindActionCreators(routerActions, dispatch),
            logout: bindActionCreators(logout, dispatch)
        }
    }
}

const connected = connect(mapStateToProps, mapDispatchToProps)(Logout);

export default connected;
