import authService from 'services/AuthService';
import * as _ from 'lodash';
import {Observable, Subject} from 'rx';

export class LogoutAction {
    logoutRequestStream: Observable<any|Error>;
    logoutRequestSuccessStream: Observable<any>;
    logoutRequestErrorStream: Observable<Error>;

    logoutRequestStartSubject: Subject<any>;

    constructor() {
        this.logoutRequestStartSubject = new Subject<any>();
        this.logoutRequestStream = authService
            .createLogoutRequestStream(this.logoutRequestStartSubject)
            .publish()
            .refCount();

        this.logoutRequestSuccessStream = this.logoutRequestStream.filter( (x:boolean) => x === true ) as Observable<boolean>;
        this.logoutRequestErrorStream = this.logoutRequestStream.filter( (x:any) => x instanceof Error ) as Observable<Error>;
    }

    doLogout() : void {
        this.logoutRequestStartSubject.onNext(null);
    }
}

export var logoutAction = new LogoutAction();