import * as React from 'react';
import LoginForm from './LoginForm/LoginForm';
import AppState from '../models/state/AppStateModel';
import authService from '../services/AuthService';

export interface Refs {
    [key: string]: __React.Component<any, any>;
    form: LoginForm;
}
export default class Login extends React.Component<any, wu.model.state.ILoginState> {

    state: wu.model.state.ILoginState;
    stream: any;
    refs: Refs;

    constructor(props:any){
        super(props);
        this.state = AppState.login;
    }

    componentWillMount() {
        AppState.login.changeStateStream.subscribe((state: wu.model.state.ILoginState) => {
            this.setState(state);
        });
    }

    componentDidMount() {
        this.stream = authService.createLoginRequestStream(this.refs.form.getLoginSubmitStream());
        this.stream.subscribe(
            (result) => {
                console.log('Login Success:', result);
            }, (err) => {
                console.log('Login Error');
            }, () => {
                console.log('Complete');
            }
        );
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
