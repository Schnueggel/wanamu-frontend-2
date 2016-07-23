import * as React from 'react';
import { Salutations, salutationOptions } from 'constants.ts';
import { RegisterForm, ISubmitData } from 'components/Register/RegisterForm';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { registerRequest, usernameCheck } from '../actions/RegisterActions';

interface IRefs {
    [key:string]: any;
    regform: RegisterForm;
}

/**
 * @class Register
 * @namespace wu.components
 * Controller Component for Registering new User
 */
export class Register extends React.Component<wu.IRegisterProps, any> implements React.ComponentLifecycle<wu.IRegisterProps, any> {

    refs: IRefs;

    constructor(props: wu.IRegisterProps) {
        super(props);
    }

    componentWillReceiveProps(nextProps: wu.IRegisterProps) {
        if (nextProps.register.user) {
            this.props.actions.routerActions.push(`/login`);
        }
    }

    handleSubmit({email, username, password, salutation,firstname, lastname}: ISubmitData) {
        this.props.actions.registerRequest({
            email,
            username,
            password,
            salutation,
            firstname,
            lastname
        });
    }

    render() {
        let error;

        if (this.props.register.error) {
            error = <p className="error-message">{this.props.register.error}</p>
        }

        return (
            <div className="register card">
                {error}
                <h3>Registration</h3>
                <div className="title">
                    <RegisterForm handleSubmit={this.handleSubmit.bind(this)} salutations={salutationOptions} salutation={Salutations.Mr} ref="regForm" usernameCheck={this.props.actions.usernameCheck}
                                  usernameState={this.props.register.usernameState} />
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        register: state.register
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            routerActions: bindActionCreators(routerActions as any, dispatch),
            registerRequest: bindActionCreators(registerRequest, dispatch),
            usernameCheck: bindActionCreators(usernameCheck, dispatch)
        }
    };
}

const connected = connect(mapStateToProps, mapDispatchToProps)(Register);

export default connected;
