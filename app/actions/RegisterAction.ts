import authService from 'services/AuthService';
import * as _ from 'lodash';
import {Observable, Subject} from 'rx';

export class RegisterAction {
    registerRequestStream: Observable<wu.model.data.IUser|Error>;
    registerRequestSuccessStream: Observable<wu.model.data.IUser>;
    registerRequestErrorStream: Observable<Error>;

    registerRequestStartSubject: Subject<any>;

    constructor() {
        this.registerRequestStartSubject = new Subject<any>();
        this.registerRequestStream = authService
            .createCurrentUserRequestStream()
            .publish()
            .refCount();

        this.registerRequestSuccessStream = this.registerRequestStream
            .filter( (x:any) => _.isObject(x) && _.isNumber(x.id) ) as Observable<wu.model.data.IUser>;

        this.registerRequestErrorStream = this.registerRequestStream
            .filter( (x:any) => x instanceof Error ) as Observable<Error>;
    }

    doRegister() : void {
        this.registerRequestStartSubject.onNext(null);
    }
}

export var registerAction = new RegisterAction();