import * as React from 'react';
import LoginForm from 'components/LoginForm/LoginForm';
import {loginAction} from 'actions/LoginAction';
import {User} from 'models/data/User';
import { connect } from 'react-redux';
import { routeActions } from 'redux-simple-router';

export interface IRefs {
    [key: string]: React.Component<any, any>;
    form: LoginForm;
}

/**
 * Container Component Login
 */
export class Login extends React.Component<wu.ILoginProps, any> implements React.ComponentLifecycle<wu.ILoginProps, any> {

    refs:IRefs;
    context: wu.IContext;

    constructor(props:wu.ILoginProps) {
        super(props);
        console.log(this);
    }

    componentWillMount() {
        this.checkForUser();
    }

    componentDidMount() {
        loginAction.connect(this.refs.form.getLoginSubmitStream());
    }

    componentWillUpdate() {
        this.checkForUser();
    }

    checkForUser() {
        if (this.props.app.user instanceof User) {
            this.goToTodoList(this.props.app.user.DefaultTodoListId);
        }
    }

    /**
     * Navigate to todolist
     * @param id
     */
    goToTodoList(id:number) {
        this.props.history.push(`/todolist/${id}`);
    }

    render() {
        let error;

        if (this.props.login.error) {
            error = <p className="error-message">{this.props.login.error}</p>
        }

        return (<div className="login mdl-card mdl-shadow--2dp">
            <h3>Login</h3>
            <div className="mdl-card__title mdl-card--expand">
                <LoginForm ref="form"/>
            </div>
        </div>);
    }
}

const connected = connect(state => state)(Login);

export default connected;