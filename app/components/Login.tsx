import * as React from 'react';
import LoginForm from './LoginForm/LoginForm';
import AppState, {LoginState} from '../models/AppStateModel';
import authService from '../services/AuthService';

export interface Refs {
    [key: string]: __React.Component<any, any>;
    form: LoginForm;
}
export default class Login extends React.Component<any, LoginState> {

    state: LoginState;

    refs: Refs;

    constructor(props:any){
        super(props);
        this.state = AppState.login;
    }

    componentWillMount() {
        AppState.loginStateChangedStream.subscribe((state: LoginState) => {
            console.log('State update received');
            this.setState(state);
        });
    }

    componentDidMount() {
        const stream = authService.createLoginRequestStream(this.refs.form.getLoginSubmitStream());
        stream.map((result: boolean) => {
            if (result === false) {
                this.state.errorMessage = 'Login failed password';
            }
        });
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
