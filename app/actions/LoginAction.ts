import authService from 'services/AuthService';
import * as _ from 'lodash';
import {Observable, Subject} from 'rx';

interface ILoginData {
    username: string;
    password: string;
}

export class LoginAction {
    loginRequestStream: Observable<wu.model.data.IUser|Error>;
    loginRequestSuccessStream: Observable<wu.model.data.IUser>;
    loginRequestErrorStream: Observable<Error>;

    private loginRequestStartSubject: Subject<ILoginData>;

    constructor() {
        this.loginRequestStartSubject = new Subject<ILoginData>();
        this.loginRequestStream = authService
            .createLoginRequestStream(this.loginRequestStartSubject)
            .publish()
            .refCount();

        this.loginRequestSuccessStream = this.loginRequestStream.filter( (x:any) => _.isObject(x) && _.isNumber(x.id) ) as Observable<wu.model.data.IUser>;
        this.loginRequestErrorStream = this.loginRequestStream.filter( (x:any) => x instanceof Error ) as Observable<Error>;
    }

    connect(obs: Observable<ILoginData>) {
        obs.subscribe(this.doLogin.bind(this));
    }

    doLogin(data: ILoginData) : void {
        this.loginRequestStartSubject.onNext(data);
    }
}

export var loginAction = new LoginAction();