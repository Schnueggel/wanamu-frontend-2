import authService from 'services/AuthService';
import * as _ from 'lodash';
import {Observable, Subject} from 'rx';

export class UserAction {
    userRequestStream: Observable<wu.model.data.IUser|Error>;
    userRequestSuccessStream: Observable<wu.model.data.IUser>;
    userRequestErrorStream: Observable<Error>;

    userRequestStartSubject: Subject<any>;

    constructor() {
        this.userRequestStartSubject = new Subject<any>();
        this.userRequestStream = authService
            .createCurrentUserRequestStream()
            .publish()
            .refCount();

        this.userRequestSuccessStream = this.userRequestStream
            .filter( (x:any) => _.isObject(x) && _.isNumber(x.id) ) as Observable<wu.model.data.IUser>;

        this.userRequestErrorStream = this.userRequestStream
            .filter( (x:any) => x instanceof Error ) as Observable<Error>;
    }

    doUser() : void {
        this.userRequestStartSubject.onNext(null);
    }
}

export var userAction = new UserAction();