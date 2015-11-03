import * as React from 'react';
import LoginForm from './LoginForm/LoginForm';

export default class Login extends React.Component<any, any> {
    constructor(props:any){
        super(props);
    }

    handleLogin () {

    }

    render() {
        return <LoginForm handleLogin={this.handleLogin.bind(this)}/>
    }
}
