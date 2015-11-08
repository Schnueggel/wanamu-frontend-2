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
    email: string;
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

    private loginSubmitStream: Rx.Observable<SubmitStreamData>;

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
    getLoginSubmitStream(): Rx.Observable<SubmitStreamData> {

        if (this.loginSubmitStream === undefined) {
            this.loginSubmitStream =  Rx.Observable
                .fromEvent<SubmitStreamData>(this.refs.submit, 'click')
                .map(() => {
                    console.log('Button clicked');
                    return {
                        email: this.refs.email.state.value,
                        password: this.refs.password.state.value
                    }
                });
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

    /**
     *
     * @returns {any}
     */
    render() {
        console.log('Render Login');
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

        return  <form>
            <TextInput {...email} ref="email" />
            <TextInput {...password} ref="password"/>
            <div className="form-container">
                <button type="submit" className="form-button" ref="submit" disabled={!enabled}>Login</button>
            </div>
        </form>
    }
}
