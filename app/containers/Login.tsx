import * as React from 'react';
import LoginForm from 'components/LoginForm/LoginForm';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { doLogin } from '../actions/LoginActions';
import * as _ from 'lodash';

/**
 * Container Component Login
 */
export class Login extends React.Component<wu.ILoginProps, any> implements React.ComponentLifecycle<wu.ILoginProps, any> {

    ctrls: {
        form?: LoginForm
    } = {};

    constructor(props:wu.ILoginProps) {
        super(props);
    }

    componentWillMount() {
        this.checkForUser(this.props.user.user);
    }

    componentWillReceiveProps(nextProps: wu.ILoginProps) {
        this.checkForUser(nextProps.user.user);
    }

    checkForUser(user: any) {
        if (typeof _.get(user, '._id') === 'string') {
            this.props.actions.routerActions.push(`/todolist/${user.defaultTodolistId}`);
        }
    }

    render() {
        let error;

        if (this.props.login.error) {
            error = <p className="error-message">{this.props.login.error}</p>
        }

        return (<div className="login card">
            {error}
            <h3 className="title">Login</h3>
            <div className="content">
                <LoginForm ref={c => this.ctrls.form = c} submit={this.props.actions.login as any}/>
            </div>
        </div>);
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        login: state.login
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            routerActions: bindActionCreators(routerActions as any, dispatch),
            login: bindActionCreators(doLogin, dispatch)
        }
    }
}

const connected = connect(mapStateToProps, mapDispatchToProps)(Login);

export default connected;
