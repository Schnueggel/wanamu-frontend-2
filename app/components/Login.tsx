import * as React from 'react';
import LoginForm from './LoginForm/LoginForm';
import AppState from '../models/state/AppStateModel';
import authService from '../services/AuthService';
import {User} from '../models/data/User';

export interface Refs {
    [key: string]: __React.Component<any, any>;
    form: LoginForm;
}
export default class Login extends React.Component<any, wu.model.state.ILoginStateModel> {

    state: wu.model.state.ILoginStateModel;
    refs: Refs;
    private loginRequestSubscription: Rx.IDisposable;
    private loginChangeSubscription: Rx.IDisposable;

    constructor(props:any){
        super(props);
        this.state = AppState.login;
    }

    componentWillMount() {
        this.loginChangeSubscription = this.state.changeStateStream.subscribe((state: wu.model.state.ILoginStateModel) => {
            this.setState(state);
        });
    }

    componentDidMount() {
        const stream = authService.createLoginRequestStream(this.refs.form.getLoginSubmitStream());
        this.loginRequestSubscription = stream.subscribe(
            (result: wu.model.data.IUser) => {
                if (result instanceof User) {
                    this.state.user = result;
                    this.props.history.pushState({id: result.DefaultTodoListId}, '/todos');
                } else {
                    console.log(result);
                }
            }, (err) => {
                console.log('Login Error');
            }, () => {
                console.log('Complete');
            }
        );
    }

    componentWillUnMount() {
        this.loginChangeSubscription.dispose();
        this.loginRequestSubscription.dispose();
    }

    render() {
        let error;

        if (this.state.errorMessage) {
            error = <p className="error-message">{this.state.errorMessage}</p>
        }

        return <div>
            {error}
            <LoginForm ref="form" />
        </div>
    }
}
