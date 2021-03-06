import * as React from 'react';
import { TextInput } from '../Form/TextInput';
import { Button } from '../Elements/Button';

export interface ILoginFormProps extends __React.Props<ILoginFormProps> {
    email?: string;
    emailErrors?: Array<string>;
    passwordErrors?: Array<string>;
    submit: (username: string, password: string) => void
}

export default class LoginForm extends React.Component<ILoginFormProps, any> {

    ctrls: {
        email?: TextInput,
        password?: TextInput,
        submit?: __React.Component<any, any> & HTMLButtonElement
    } = {};

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
        name   : 'email',
        pattern: /[^ @]*@[^ @]*/,
        errors : ['Please type your email']
    };

    password: any = {
        type   : 'password',
        label  : 'Password',
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
        })
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
            <TextInput ref={c => this.ctrls.email = c } {...this.email} onChange={this.handleUsernameChange.bind(this)}/>
            <TextInput ref={c => this.ctrls.password = c } {...this.password} onChange={this.handlePasswordChange.bind(this)} />
            <div className="form-actionbar">
                <Button ref={c => this.ctrls.submit = c } onClick={this.handleClick.bind(this)} disabled={!this.state.valid}>
                    Login
                </Button>
            </div>
        </form>
    }
}
