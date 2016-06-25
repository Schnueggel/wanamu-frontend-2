import * as React from 'react';
import { requestLogout } from 'actions/LogoutActions';
import { connect } from 'react-redux';
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
        this.props.actions.requestLogout();
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
            logout: bindActionCreators(requestLogout, dispatch)
        }
    };
}

const connected = connect(mapStateToProps, mapDispatchToProps)(Logout);

export default connected;
