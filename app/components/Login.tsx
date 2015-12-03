import * as React from 'react';
import LoginForm from 'components/LoginForm/LoginForm';
import {loginAction} from 'actions/LoginAction';
import {User} from 'models/data/User';
import {AppStateModel} from 'models/state/AppStateModel';

export interface IRefs {
    [key: string]: __React.Component<any, any>;
    form: LoginForm;
}

export interface LoginProps extends __React.Props<LoginProps> {
    params: {
        id?: number
    },
    history: any;
    appState: AppStateModel
}

export default class Login extends React.Component<LoginProps, any> {

    refs:IRefs;
    private loginChangeSubscription:Rx.IDisposable;

    constructor(props:LoginProps) {
        super(props);
    }

    componentWillMount() {
        if (this.props.appState.login.user instanceof User) {
            this.goToTodoList(this.props.appState.login.user.DefaultTodoListId);
        }
        this.loginChangeSubscription = this.props.appState.login.changeStateStream.subscribe((state:wu.model.state.ILoginStateModel) => {
            if (state.user instanceof User) {
                this.goToTodoList(state.user.DefaultTodoListId);
            }
        });
    }

    componentDidMount() {
        loginAction.connect(this.refs.form.getLoginSubmitStream());
    }

    componentWillUnmount() {
        this.loginChangeSubscription.dispose();
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
