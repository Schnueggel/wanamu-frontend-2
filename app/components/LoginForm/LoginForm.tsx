import * as React from 'react';
import { Subject, Observable } from 'rx';
import {TextInput} from '../Form/TextInput';
import { Button } from '../Elements/Button';
import * as _ from 'lodash';

export interface ILoginFormProps extends __React.Props<ILoginFormProps> {
    email?: string;
    emailErrors?: Array<string>;
    passwordErrors?: Array<string>;
    submit: (username: string, password: string) => void
}

export interface  IRefs {
    [key: string]: __React.Component<any, any>;
    email: TextInput,
    password: TextInput,
    submit: __React.Component<any, any> & HTMLButtonElement
}

export default class LoginForm extends React.Component<ILoginFormProps, any> {

    refs: IRefs;

    state: any = {
        valid: false,
        username: null,
        usernameValid: false,
        password: null,
        passwordValid: false
    };

    email: any = {
        type   : 'email',
        label  : 'Email',
        ref    : 'email',
        name   : 'email',
        pattern: /[^ @]*@[^ @]*/,
        errors : ['Please type your email']
    };

    password: any = {
        type   : 'password',
        label  : 'Password',
        ref    : 'password',
        name   : 'password',
        pattern: /.+/,
        errors : ['Password required']
    };

    /**
     *
     * @param props
     */
    constructor(props: ILoginFormProps) {
        super(props);
    }


    handleClick() {
        this.props.submit( this.state.username,  this.state.password);
    }

    handleUsernameChange({valid, value}) {
        this.setState({
            valid: valid && this.state.passwordValid,
            usernameValid: valid,
            username: value
        });
    }

    handlePasswordChange({valid, value}) {
        this.setState({
            valid: this.state.usernameValid && valid,
            passwordValid: valid,
            password: value
        });
    }

    /**
     *
     * @returns {any}
     */
    render() {
        return  <form name="login" action="#">
            <TextInput {...this.email} onChange={this.handleUsernameChange.bind(this)}/>
            <TextInput {...this.password} onChange={this.handlePasswordChange.bind(this)} />
            <div className="form-actionbar">
                <Button ref="submit" onClick={this.handleClick.bind(this)} disabled={!this.state.valid}>
                    Login
                </Button>
            </div>
        </form>
    }
}
