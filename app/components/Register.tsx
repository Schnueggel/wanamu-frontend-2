import * as React from 'react';
import * as Actions from 'actions/actions';
import { salutations, Salutation, User, Profile } from 'models/data/models';
import { RegisterForm, ISubmitStreamData } from 'components/Register/RegisterForm';

export interface RegisterProps extends wu.IControlProps<RegisterProps> {}

/**
 * @class Register
 * @namespace wu.components
 * Controller Component for Registering new User
 */
export default class Register extends React.Component<RegisterProps, any> {

    refs: any = {
        regform: RegisterForm
    };
    context: wu.IContext;

    constructor(props:RegisterProps) {
        super(props);
    }

    componentWillReceiveProps(nextProps: RegisterProps) {
        if (nextProps.appState.register.registrationSuccess === true) {
            nextProps.appState.register.registrationSuccess = false;
            this.props.history.push(`/login`);
        }
    }

    handleSubmit({email, password, salutation,firstname, lastname}: ISubmitStreamData) {
        const user = new User({
            email,
            password,
            Profile: new Profile({
                salutation,
                firstname,
                lastname
            })
        });
        Actions.registerAction.doRegister(user);
    }
    render() {
        return (
            <div className="register mdl-card mdl-shadow--2dp">
                <h3>Registration</h3>
                <div className="mdl-card__title mdl-card--expand">
                    <RegisterForm handleSubmit={this.handleSubmit} salutations={salutations} salutation={Salutation.Mr} />
                </div>
            </div>
        );
    }
}
