import * as React from 'react';
import { Subject } from 'rx';
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
        email: TextInput,
        password: TextInput,
        passwordConfirm: TextInput,
        lastname: TextInput,
        firstname: TextInput
    };

    state: any = {
        salutation: '',
        emailErrors: [],
        passwordErrors: [],
        passwordConfirmErrors: [],
        lastnameErrors: [],
        firstnameErrors: [],
        isEmailValid: false,
        isPasswordValid: false,
        isPasswordConfirmValid: false,
        isFirstnameValid: false,
        isLastnameValid: false
    };

    private registerSubmitStream: Subject<ISubmitStreamData>;

    /**
     * @constructor
     * @param props
     */
    constructor(props:IRegisterFormProps){
        super(props);
        this.state.salutation = props.salutation;
    }

    /**
     *
     * @returns {Rx.Observable<{email: string, password: string}>}
     */
    getRegisterSubmitStream(): Subject<ISubmitStreamData> {
        if (this.registerSubmitStream === undefined) {
            this.registerSubmitStream =  new Subject<ISubmitStreamData>();
        }

        return this.registerSubmitStream;
    }

    /**
     *
     * @param evt
     */
    validateEmail(evt: any) {
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
    validatePassword(evt: any) {
        let isValid = evt.target.value.match(/.+/) !== null;
        this.state.passwordErrors = [];

        if (isValid === false) {
            this.state.passwordErrors.push('Password required');
        }

        if (evt.target.value !== this.refs.passwordConfirm.refs.field.value) {
            isValid = false;
        }

        this.setState({
            isPasswordValid: isValid
        });
    }

    /**
     *
     * @param evt
     */
    validatePasswordConfirm(evt: any) {
        const isValid = evt.target.value === this.refs.password.refs.field.value;
        this.state.passwordConfirmErrors = [];

        if (isValid === false) {
            this.state.passwordConfirmErrors.push('Password confirmation must match password');
        }

        this.setState({
            isPasswordValid: isValid ? true : this.state.isPasswordValid,
            isPasswordConfirmValid: isValid
        });
    }

    /**
     *
     * @param evt
     */
    validateLastname(evt) {
        const isValid = evt.target.value.match(/.+/) !== null;
        this.state.lastnameErrors = [];

        if (isValid === false) {
            this.state.lastnameErrors.push('Firstname required');
        }

        this.setState({
            isLastnameValid: isValid
        });
    }

    /**
     *
     * @param evt
     */
    validateFirstname(evt) {
        const isValid = evt.target.value.match(/.+/) !== null;
        this.state.firstnameErrors = [];

        if (isValid === false) {
            this.state.firstnameErrors.push('Firstname required');
        }

        this.setState({
            isFirstnameValid: isValid
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
        if (this.isFormValid()) {
            this.props.handleSubmit({
                salutation: this.state.salutation,
                email: this.refs.email.refs.field.value,
                password: this.refs.password.refs.field.value,
                firstname: this.refs.firstname.refs.field.value,
                lastname: this.refs.lastname.refs.field.value
            });
        }
    }

    isFormValid(): boolean {
        return this.state.isEmailValid && this.state.isPasswordValid && this.state.isFirstnameValid && this.state.isLastnameValid;
    }

    /**
     *
     * @returns {any}
     */
    render() {
        const email:any = {
            type: 'email',
            label: 'Email',
            ref: 'email',
            name: 'email',
            errors: this.state.emailErrors,
            onChange: this.validateEmail.bind(this)
        },
        password:any = {
            type: 'password',
            label: 'Password',
            ref: 'password',
            name: 'password',
            errors: this.state.passwordErrors,
            onChange: this.validatePassword.bind(this)
        },
        passwordConfirm:any = {
            type: 'password',
            label: 'Confirm Password',
            ref: 'passwordConfirm',
            name: 'password-confirm',
            errors: this.state.passwordConfirmErrors,
            onChange: this.validatePasswordConfirm.bind(this)
        },
        lastname: any = {
            type: 'text',
            label: 'Lastname',
            ref: 'lastname',
            name: 'lastname',
            errors: this.state.lastnameErrors,
            onChange: this.validateFirstname.bind(this)
        },
        firstname: any = {
            type: 'text',
            label: 'Firstname',
            ref: 'firstname',
            name: 'firstname',
            errors: this.state.firstnameErrors,
            onChange: this.validateLastname.bind(this)
        },
        disabled = !this.isFormValid();

        return (
           <form name="register" action="#">
                <div>
                {this.createSalutationRadioButtons()}
                </div>
                <TextInput {...email} />
                <TextInput {...firstname} />
                <TextInput {...lastname} />
                <TextInput {...password} />
                <TextInput {...passwordConfirm} />
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
        return this.props.salutations.map(( sal ) => (
                <RadioButton name="salutation" value={sal.id} id={`register-salutation-${sal.id}`} key={sal.id} label={sal.name} checked={this.state.salutation === sal.id}
                                 onChange={this.handleSalutationChange.bind(this)}/>
            )
        );
    }
}
