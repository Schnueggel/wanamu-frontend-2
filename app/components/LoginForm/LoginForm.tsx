import * as React from 'react';
import { Subject, Observable } from 'rx';
import TextInput from 'components/Form/TextInput';
import * as _ from 'lodash';

export interface ILoginFormProps extends __React.Props<ILoginFormProps> {
    email?: string;
    emailErrors?: Array<string>;
    passwordErrors?: Array<string>;
}

export interface  IRefs {
    [key: string]: __React.Component<any, any>;
    email: TextInput,
    password: TextInput,
    submit: __React.Component<any, any> & HTMLButtonElement
}

export interface ISubmitStreamData {
    username: string;
    password: string;
}

export default class LoginForm extends React.Component<ILoginFormProps, any> {

    refs: IRefs;

    state: any = {
        valid: false
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

    private loginSubmitStream: Subject<ISubmitStreamData>;
    private formStateStream: Observable<any>;

    /**
     *
     * @param props
     */
    constructor(props: ILoginFormProps) {
        super(props);
    }

    /**
     *
     * @returns {Rx.Observable<{email: string, password: string}>}
     */
    getLoginSubmitStream(): Subject<ISubmitStreamData> {
        if (this.loginSubmitStream === undefined) {
            this.loginSubmitStream = new Subject<ISubmitStreamData>();
        }

        return this.loginSubmitStream;
    }

    handleClick() {
        this.getLoginSubmitStream().onNext({
            username: this.state.email,
            password: this.state.password
        });
    }

    componentDidMount() {
        this.formStateStream = Observable.combineLatest(
            this.refs.email.stateStream,
            this.refs.password.stateStream,
            (e: any, p: any)=> {
                return {
                    valid    : e.valid && p.valid,
                    email    : e.value,
                    password : p.value
                }
            }
        );

        this.formStateStream.subscribe((data)=> this.setState(data));
    }

    /**
     *
     * @returns {any}
     */
    render() {
        return  <form name="login" action="#">
            <TextInput {...this.email}/>
            <TextInput {...this.password}/>
            <div className="form-actionbar">
                <button type="button" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" ref="submit" onClick={this.handleClick.bind(this)}
                        disabled={!this.state.valid}>Login
                </button>
            </div>
        </form>
    }
}
