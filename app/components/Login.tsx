import * as React from 'react';
import LoginForm from 'components/LoginForm/LoginForm';
import { User } from 'models/data/User';
import { connect } from 'react-redux';
import { routeActions } from 'redux-simple-router';
import { bindActionCreators } from 'redux';
import { login } from '../actions/LoginAction';
import * as _ from 'lodash';

export interface IRefs {
    [key: string]: React.Component<any, any>;
    form: LoginForm;
}

/**
 * Container Component Login
 */
export class Login extends React.Component<wu.ILoginProps, any> implements React.ComponentLifecycle<wu.ILoginProps, any> {

    refs:IRefs;
    constructor(props:wu.ILoginProps) {
        super(props);
    }

    componentWillMount() {
        this.checkForUser(this.props.app.user);
    }

    componentWillReceiveProps(nextProps: wu.ILoginProps) {
        this.checkForUser(nextProps.app.user);
    }

    checkForUser(user: any) {
        if (typeof _.get(user, '._id') === 'string') {
            console.log(this.props.actions.routeActions);
            this.props.actions.routeActions.push(`/todolist/${user.defaultTodolistId}`);
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
                <LoginForm ref="form" submit={this.props.actions.login as any}/>
            </div>
        </div>);
    }
}

function mapStateToProps(state) {
    return {
        app: state.app,
        login: state.login
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            routeActions: bindActionCreators(routeActions, dispatch),
            login: bindActionCreators(login, dispatch)
        }
    }
}

const connected = connect(mapStateToProps, mapDispatchToProps)(Login);

export default connected;