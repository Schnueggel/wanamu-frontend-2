import * as _ from 'lodash';
import { Observable, Subject } from 'rx';
import { registerService } from 'services/RegistrationService';

import IUser = wu.model.data.IUser;

export class RegisterAction {
    registerRequestStream: Observable<IUser|Error>;
    registerRequestSuccessStream: Observable<IUser>;
    registerRequestErrorStream: Observable<Error>;

    registerRequestStartSubject: Subject<IUser>;

    constructor() {console.log( registerService );
        this.registerRequestStartSubject = new Subject<IUser>();

        this.registerRequestStream = registerService
            .createRegistrationRequestStream(this.registerRequestStartSubject)
            .publish()
            .refCount();

        this.registerRequestSuccessStream = this.registerRequestStream
            .filter( (x:any) => _.isObject(x) && _.isNumber(x.id) ) as Observable<IUser>;

        this.registerRequestErrorStream = this.registerRequestStream
            .filter( (x:any) => x instanceof Error ) as Observable<Error>;
    }

    doRegister(user: IUser) : void {
        this.registerRequestStartSubject.onNext(user);
    }
}

export const registerAction = new RegisterAction();