import * as React from 'react';
import TextInput from '../Form/TextInput';

interface LoginFormProps {
    handleLogin: React.MouseEventHandler
}

export default class LoginForm extends React.Component<LoginFormProps, any> {
    constructor(props:LoginFormProps){
        super(props);
    }

    render() {
        const email:any = {
            type: 'email',
            label: 'Email',
            validators: [
                {
                    regex: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i,
                    text: 'Please enter a valid Email'
                }
            ]
        };

        const password: any = {
            type: 'password',
            label: 'Password',
            validators: [
                {
                    regex: /.+/,
                    text: 'Password required'
                }
            ]
        };

        return  <form>
            <TextInput {...email} />
            <TextInput {...password} />
            <div className="form-container">
                <button className="form-button" onClick={this.props.handleLogin}>Login</button>
            </div>
        </form>
    }
}
