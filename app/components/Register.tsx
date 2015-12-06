import * as React from 'react';
import * as Actions from 'actions/actions';
import { salutations, Salutation } from 'models/data/Profile';
import { RegisterForm } from 'components/Register/RegisterForm';

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

    constructor(props:RegisterProps) {
        super(props);
    }

    render() {
        return (
            <RegisterForm ref="regform" salutations={salutations} salutation={Salutation.Mr} />
        );
    }
}
