import * as React from 'react';
import * as _ from 'lodash';
import * as Actions from 'actions/actions';
import TextInput from 'components/Form/TextInput';
import RadioButton from 'components/Form/RadioButton';

export interface RegisterProps extends wu.IControlProps<RegisterProps> {}

/**
 *
 * Controller Component for a TodoList
 */
export default class Register extends React.Component<RegisterProps, any> {

    state:any = {
        salutation: 'mr',
        isValid: false
    };

    constructor(props:RegisterProps) {
        super(props);
    }

    handleSubmit() {

    }

    handleSalutationChange(evt) {
        let state = 'mrs';

        if (evt.target.value === 'mr') {
            state = 'mr';
        }

        this.setState({
            salutation: state
        });
    }

    render() {
        return (
            <div className="register mdl-card mdl-shadow--2dp">
                <h3>Registration</h3>
                <div className="mdl-card__title mdl-card--expand">
                    <form name="register" action="#">
                        <RadioButton name="salutation" value="mr" id="register-salutation-mr" label="Mr" checked={this.state.salutation === 'mr'} onChange={this.handleSalutationChange.bind(this)}/>
                        <RadioButton name="salutation" value="mrs" id="register-salutation-mrs" label="Mrs" checked={this.state.salutation === 'mrs'}
                                     onChange={this.handleSalutationChange.bind(this)}/>
                        <TextInput label="Email" name="email"/>
                        <TextInput label="Firstname" name="firstname"/>
                        <TextInput label="Lastname" name="lastname"/>
                        <TextInput label="Password" type="password" name="password"/>
                        <TextInput label="Confirm Password" type="password" name="password-confirm"/>
                        <div className="form-actionbar">
                            <button type="button" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" ref="submit"
                                    onClick={this.handleSubmit.bind(this)} disabled={!this.state.isValid}>Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>);
    }
}
