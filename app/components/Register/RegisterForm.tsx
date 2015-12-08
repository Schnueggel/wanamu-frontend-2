import * as React from 'react';
import { Subject, Observable } from 'rx';
import TextInput from '../Form/TextInput';
import RadioButton from '../Form/RadioButton';
import * as _ from 'lodash';

export interface IRegisterFormProps extends __React.Props<IRegisterFormProps> {
    salutation: string;
    salutations: Array<{id:string, name:string}>;
    handleSubmit: (data: ISubmitStreamData) => void
}

export interface ISubmitStreamData {
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
export class RegisterForm extends React.Component<IRegisterFormProps, any> {

    refs: any = {
        email          : TextInput,
        password       : TextInput,
        passwordConfirm: TextInput,
        lastname       : TextInput,
        firstname      : TextInput
    };

    state: any = {
        salutation            : '',
        emailErrors           : [],
        passwordErrors        : [],
        passwordConfirmErrors : [],
        lastnameErrors        : [],
        firstnameErrors       : [],
        isEmailValid          : false,
        isPasswordValid       : false,
        isPasswordConfirmValid: false,
        isFirstnameValid      : false,
        isLastnameValid       : false
    };

    email: any = {
        type   : 'email',
        label  : 'Email',
        ref    : 'email',
        name   : 'email',
        pattern: /[^ @]*@[^ @]*/,
        errors : ['Valid Email required']
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
        errors : ['Confirm your password']
    };

    lastname: any = {
        type   : 'text',
        label  : 'Lastname',
        ref    : 'lastname',
        name   : 'lastname',
        pattern: /.+/,
        errors : ['Lastname is required']
    };

    firstname: any = {
        type   : 'text',
        label  : 'Firstname',
        ref    : 'firstname',
        name   : 'firstname',
        pattern: /.+/,
        errors : ['Lastname is required']
    };

    private formStateStream: Observable<any>;

    /**
     * @constructor
     * @param props
     */
    constructor(props: IRegisterFormProps) {
        super(props);
        this.state.salutation = props.salutation;
    }

    /**
     * Lifecycle
     */
    componentDidMount() {
        this.formStateStream = Observable.combineLatest(
            this.refs.email.stateStream,
            this.refs.firstname.stateStream,
            this.refs.lastname.stateStream,
            this.refs.password.stateStream,
            this.refs.passwordConfirm.stateStream,
            (e: any, f: any, l: any, p: any, pc: any)=> {console.log('hund2');
                return {
                    valid    : e.valid && f.valid && l.valid && p.valid && pc.valid,
                    email    : e.value,
                    firstname: f.value,
                    lastname : l.value,
                    password : p.value
                }
            }
            );

        this.formStateStream.subscribe((data)=> this.setState(data));
    }

    /**
     *
     * @param evt
     */
    validatePassword(evt: any) {
        this.passwordConfirm.pattern = new RegExp(evt.target.value);

        this.setState({
            pattern: this.password.pattern
        });
    }

    handleSalutationChange(evt) {
        if (evt.target.value === this.state.salutation) {
            return;
        }

        this.setState({
            salutation: evt.target.value
        });
    }

    handleSubmit() {
        if (this.state.valid) {
            this.props.handleSubmit({
                salutation: this.state.salutation,
                email     : this.state.email,
                password  : this.state.password,
                firstname : this.state.firstname,
                lastname  : this.state.lastname
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
                <div>
                    {this.createSalutationRadioButtons()}
                </div>
                <TextInput {...this.email} />
                <TextInput {...this.firstname} />
                <TextInput {...this.lastname} />
                <TextInput {...this.password} />
                <TextInput {...this.passwordConfirm} />
                <div className="form-actionbar">
                    <button type="button" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" ref="submit"
                            onClick={this.handleSubmit.bind(this)} disabled={disabled}>Register
                    </button>
                </div>
            </form>
        );
    }

    /**
     * Creates the saluation radio buttons
     */
    createSalutationRadioButtons() {
        return this.props.salutations.map((sal) => (
                <RadioButton name="salutation" value={sal.id} id={`register-salutation-${sal.id}`} key={sal.id} label={sal.name} checked={this.state.salutation === sal.id}
                             onChange={this.handleSalutationChange.bind(this)}/>
            )
        );
    }
}
