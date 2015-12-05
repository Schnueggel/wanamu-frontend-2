import * as React from 'react';
import LoginForm from 'components/LoginForm/LoginForm';
import {loginAction} from 'actions/LoginAction';
import {User} from 'models/data/User';
import {AppStateModel} from '../models/states/AppStateModel';

export interface IRefs {
    [key: string]: __React.Component<any, any>;
    form: LoginForm;
}

export interface LoginProps extends wu.IControlProps<LoginProps> {
    params: {
        id?: number
    }
}

export default class Login extends React.Component<LoginProps, any> {

    refs:IRefs;

    constructor(props:LoginProps) {
        super(props);
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
        if (this.props.appState.login.user instanceof User) {
            this.goToTodoList(this.props.appState.login.user.DefaultTodoListId);
        }
    }

    /**
     * Navigate to todolist
     * @param id
     */
    goToTodoList(id:number) {
        this.props.history.pushState(null, `/todolist/${id}`);
    }

    render() {
        let error;

        if (this.props.appState.login.errorMessage) {
            error = <p className="error-message">{this.state.errorMessage}</p>
        }

        return (<div className="login mdl-card mdl-shadow--2dp">
            <h3>Login</h3>
            <div className="mdl-card__title mdl-card--expand">
                <LoginForm ref="form"/>
            </div>
        </div>);
    }
}
