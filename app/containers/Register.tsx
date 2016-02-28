import * as React from 'react';
import { Salutations, salutionOptions } from 'constants';
import { RegisterForm, ISubmitData } from 'components/Register/RegisterForm';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { register, usernameCheck } from '../actions/RegisterActions';

/**
 * @class Register
 * @namespace wu.components
 * Controller Component for Registering new User
 */
export class Register extends React.Component<wu.IRegisterProps, any> implements React.ComponentLifecycle<wu.IRegisterProps, any> {

    refs: any = {
        regform: RegisterForm
    };

    constructor(props: wu.IRegisterProps) {
        super(props);
    }

    componentWillReceiveProps(nextProps: wu.IRegisterProps) {
        if (nextProps.register.user) {
            this.props.actions.routeActions.push(`/login`);
        }
    }

    handleSubmit({email, username, password, salutation,firstname, lastname}: ISubmitData) {
        this.props.actions.register({
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
                    <RegisterForm handleSubmit={this.handleSubmit.bind(this)} salutations={salutionOptions} salutation={Salutations.Mr} ref="regForm" usernameCheck={this.props.actions.usernameCheck}
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
            routeActions: bindActionCreators(routeActions, dispatch),
            register: bindActionCreators(register, dispatch),
            usernameCheck: bindActionCreators(usernameCheck, dispatch)
        }
    };
}

const connected = connect(mapStateToProps, mapDispatchToProps)(Register);

export default connected;