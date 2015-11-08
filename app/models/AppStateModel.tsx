import MenuModel from './MenuModel';
import * as Rx from 'rx';
import * as Q from 'q';

export interface LoginState {
    errorMessage: string;
    email : string,
    emailErrors : Array<string>,
    passwordErrors : Array<string>
}

export class AppStateModel {
    menu: any;

    login: LoginState = {
        errorMessage: '',
        email: '',
        emailErrors: [],
        passwordErrors: []
    } as LoginState;

    loginStateChangedStream: Rx.Subject<LoginState>;

    constructor() {
        this.menu = new MenuModel();
        this.loginStateChangedStream = new Rx.Subject<LoginState>();
    }

    notifyLoginState() {
        this.loginStateChangedStream.onNext(this.login);
    }
}

const AppState = new AppStateModel();

export default AppState;