import * as React from 'react';
import TextInput from '../Form/TextInput';
import RadioButton from '../Form/RadioButton';
import * as _ from 'lodash';
import { Button } from '../Elements/Button';

export interface IRegisterFormProps extends __React.Props<IRegisterFormProps> {
    salutation: string;
    salutations: Array<{id:string, name:string}>;
    handleSubmit: (data: ISubmitData) => void;
    usernameCheck: (name) => void;
}

export interface ISubmitData {
    username: string;
    email: string;
    password: string;
    salutation: string;
    firstname: string;
    lastname: string;
}

/**
 * @class RegisterForm
 * @namespace wu.components.Register
 */
export class RegisterForm extends React.Component<IRegisterFormProps, any> implements React.ComponentLifecycle<IRegisterFormProps, any> {

    refs: any = {
        email          : TextInput,
        password       : TextInput,
        passwordConfirm: TextInput,
        lastname       : TextInput,
        firstname      : TextInput,
        username       : TextInput
    };

    state: any = {
        valid                 : false,
        salutation            : {valid: false, value: ''},
        username              : {valid: false, value: ''},
        firstname             : {valid: false, value: ''},
        lastname              : {valid: false, value: ''},
        email                 : {valid: false, value: ''},
        password              : {valid: false, value: ''},
        passwordConfirm       : {valid: false, value: ''}
    };

    email: any = {
        type   : 'email',
        label  : 'Email',
        ref    : 'email',
        name   : 'email',
        pattern: /[^ @]*@[^ @]*/,
        errors : ['Valid Email required'],
        onChange: (...args) => this.handleChange(...args, 'email')
    };

    password: any = {
        type    : 'password',
        label   : 'Password',
        ref     : 'password',
        name    : 'password',
        pattern : /(.+){8,}/,
        errors  : ['Password must be at least 8 chars long'],
        onChange: this.validatePassword.bind(this)
    };

    passwordConfirm: any = {
        type   : 'password',
        label  : 'Confirm Password',
        ref    : 'passwordConfirm',
        name   : 'password-confirm',
        pattern: /.+/,
        errors : ['Confirm your password'],
        onChange: (...args) => this.handleChange(...args, 'passwordConfirm')
    };

    lastname: any = {
        type   : 'text',
        label  : 'Lastname',
        ref    : 'lastname',
        name   : 'lastname',
        pattern: /.+/,
        errors : ['Lastname is required'],
        onChange: (...args) => this.handleChange(...args, 'lastname')
    };

    firstname: any = {
        type   : 'text',
        label  : 'Firstname',
        ref    : 'firstname',
        name   : 'firstname',
        pattern: /.+/,
        errors : ['Firstname is required'],
        onChange: (...args) => this.handleChange(...args, 'firstname')
    };

    username: any = {
        type   : 'text',
        label  : 'Username',
        ref    : 'username',
        name   : 'username',
        pattern: /.+/,
        errors : ['Username is required'],
        onBlur: this.handleUsernameBlur.bind(this),
        onChange: (...args) => this.handleChange(...args, 'username')
    };

    /**
     * @constructor
     * @param props
     */
    constructor(props: IRegisterFormProps) {
        super(props);
        this.state.salutation.value = props.salutation;
    }

    /**
     *
     * @param evt
     */
    validatePassword({value, valid}) {
        this.passwordConfirm.pattern = new RegExp(`^${value}$`);

        this.handleChange({value, valid}, 'password');
    }

    handleSalutationChange({value, valid}) {
        if (value === this.state.salutation.value) {
            return;
        }

        this.handleChange({value, valid}, 'salutation');
    }

    /**
     *
     * @param value
     */
    handleUsernameBlur(value) {
        if (this.props.usernameCheck) {
            this.props.usernameCheck(value);
        }
    }

    /**
     *
     * @param state
     * @param field
     */
    handleChange(state, field){
        const valid = ['username', 'lastname', 'firstname', 'email', 'password', 'passwordConfirm'].every( v => {
            if (v === field) {
                return state.valid;
            }
            return this.state[v].valid;
        });
        this.setState({
            [field]: state,
            valid
        });
    }

    /**
     * Trigger the callback if the state of the form is valid
     */
    handleSubmit() {
        if (this.state.valid) {
            this.props.handleSubmit({
                salutation: this.state.salutation.value,
                email     : this.state.email.value,
                password  : this.state.password.value,
                firstname : this.state.firstname.value,
                lastname  : this.state.lastname.value,
                username  : this.state.username.value
            });
        }
    }

    /**
     *
     * @returns {any}
     */
    render() {
        const disabled = !this.state.valid;

        return (
            <form name="register" action="#">
                <div className="radiogroup__container">
                    {this.createSalutationRadioButtons()}
                </div>
                <TextInput {...this.username} />
                <TextInput {...this.email} />
                <TextInput {...this.firstname} />
                <TextInput {...this.lastname} />
                <TextInput {...this.password} />
                <TextInput {...this.passwordConfirm} />
                <div className="form-actionbar">
                    <Button ref="submit" onClick={this.handleSubmit.bind(this)} disabled={disabled}>
                        Register
                    </Button>
                </div>
            </form>
        );
    }

    /**
     * Creates the saluation radio buttons
     */
    createSalutationRadioButtons() {
        return this.props.salutations.map((sal) => (
                <RadioButton name="salutation" value={sal.id} id={`register-salutation-${sal.id}`} key={sal.id} label={sal.name} checked={this.state.salutation.value === sal.id}
                             onChange={this.handleSalutationChange.bind(this)}/>
            )
        );
    }
}
