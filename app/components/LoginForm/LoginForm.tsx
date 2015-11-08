import * as React from 'react';
import * as Rx from 'rx';
import TextInput from '../Form/TextInput';
import AppState, {LoginState} from '../../models/AppStateModel';
import {AppStateModel} from "../../models/AppStateModel";

export interface LoginFormProps extends __React.Props<LoginFormProps> {
    handleLogin: React.MouseEventHandler
}

export interface SubmitStreamData {
    email: string;
    password: string;
}

export default class LoginForm extends React.Component<LoginFormProps, any> {

    refs: any = {
        email: HTMLInputElement,
        password: HTMLInputElement,
    };

    state: LoginState;

    loginStream: Rx.Observable<boolean>;
    loginStreamSubscription: Rx.IDisposable;

    constructor(props:LoginFormProps){
        super(props);
        this.state = AppState.login;
    }

    componentWillMount(){
        AppState.loginStateChangedStream.subscribe((state: LoginState) => {
            console.log('State update received');
            this.setState(state);
        });
    }

    componentDidMount(){
        this.loginStream = AppState.createLoginResponseStream(this.getLoginSubmitStream());

        this.loginStreamSubscription = this.loginStream.subscribe((result) => {
            console.log('Do forwarding');
        }, (err: Error) => {
            console.error(err);
        });
    }

    componentWillUnmount() {
        this.loginStreamSubscription.dispose();
    }

    getLoginSubmitStream(): Rx.Observable<{email:string,password:string}> {
        return Rx.Observable
            .fromEvent<SubmitStreamData>(this.refs.submit, 'click')
            .map(() => {
                console.log('Button clicked');
                return {
                    email: this.refs.email.state.value,
                    password: this.refs.password.state.value
                }
            });
    }

    validateEmail(evt) {
        const isValid = evt.target.value.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i) !== null;

        this.state.emailErrors = [];

        if (isValid === false) {
            this.state.emailErrors.push('Please enter a valid Email');
        }

        this.setState({
            isEmailValid: isValid
        });
    }

    validatePassword(evt) {

        const isValid = evt.target.value.match(/.+/) !== null;
        this.state.passwordErrors = [];

        if (isValid === false) {
            this.state.passwordErrors.push('Password required');
        }

        this.setState({
            isPasswordValid: isValid
        });
    }

    render() {
        console.log('Render Login');
        const email:any = {
            type: 'email',
            label: 'Email',
            errors: this.state.emailErrors,
            onChange: this.validateEmail.bind(this)
        },
            password:any = {
            type: 'password',
            label: 'Password',
            errors: this.state.passwordErrors,
            onChange: this.validatePassword.bind(this)
        },
            enabled = this.state.isEmailValid && this.state.isPasswordValid;

        return  <form>
            <TextInput {...email} ref="email" />
            <TextInput {...password} ref="password"/>
            <div className="form-container">
                <button type="submit" className="form-button" ref="submit" disabled={!enabled}>Login</button>
            </div>
        </form>
    }
}
