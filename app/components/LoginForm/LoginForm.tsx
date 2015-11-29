import * as React from 'react';
import * as Rx from 'rx';
import TextInput from '../Form/TextInput';
import * as _ from 'lodash';

export interface LoginFormProps extends __React.Props<LoginFormProps> {
    email?: string;
    emailErrors?: Array<string>;
    passwordErrors?: Array<string>;
}

export interface  Refs {
    [key: string]: __React.Component<any, any>;
    email: TextInput,
    password: TextInput,
    submit: __React.Component<any, any> & HTMLButtonElement
}

export interface SubmitStreamData {
    username: string;
    password: string;
}

export default class LoginForm extends React.Component<LoginFormProps, any> {

    refs: Refs;

    state: any = {
        emailErrors: [],
        passwordErrors: [],
        isEmailValid: false,
        isPasswordValid: false
    };

    private loginSubmitStream: Rx.ReplaySubject<SubmitStreamData>;

    /**
     *
     * @param props
     */
    constructor(props:LoginFormProps){
        super(props);

        this.state.emailErrors = this.props.emailErrors;
        this.state.passwordErrors = this.props.passwordErrors;
    }

    /**
     *
     * @returns {Rx.Observable<{email: string, password: string}>}
     */
    getLoginSubmitStream(): Rx.Subject<SubmitStreamData> {
        if (this.loginSubmitStream === undefined) {console.log('create login stream');
            this.loginSubmitStream =  new Rx.ReplaySubject<SubmitStreamData>(1);
        }

        return this.loginSubmitStream;
    }

    /**
     *
     * @param evt
     */
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

    /**
     *
     * @param evt
     */
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

    handleClick() {
        this.getLoginSubmitStream().onNext(
            {
                username: this.refs.email.state.value,
                password: this.refs.password.state.value
            }
        );
    }

    /**
     *
     * @returns {any}
     */
    render() {

        const email:any = {
            type: 'email',
            label: 'Email',
            value: this.props.email,
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

        return  <form name="login" action="#">
            <TextInput {...email} ref="email" name="username"/>
            <TextInput {...password} ref="password" name="password"/>
            <div className="form-actionbar">
                <button type="button" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" ref="submit" onClick={this.handleClick.bind(this)} disabled={!enabled}>Login</button>
            </div>
        </form>
    }
}
