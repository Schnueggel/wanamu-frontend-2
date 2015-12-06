import * as Rx from 'rx';
import * as Actions from 'actions/actions';
import { BaseStateModel } from 'models/states/BaseStateModel';
import {Notify} from 'models/decorators/NotifyDecorator';
import IUser = wu.model.data.IUser;

export class RegisterStateModel extends BaseStateModel<RegisterStateModel> implements wu.model.states.IRegisterStateModel {

    private _registrationSuccess:boolean;
    private _registrationFailed:Error;
    private _isRegistering:boolean;

    constructor() {
        super();

        Actions.registerAction.registerRequestSuccessStream.subscribe( (user: IUser) => {
            this.registrationSuccess = true;
        });
    }

    @Notify
    get registrationSuccess():boolean {
        return this._registrationSuccess;
    }

    set registrationSuccess(value:boolean) {
        this._registrationSuccess = value;
    }

    @Notify
    get registrationFailed():Error {
        return this._registrationFailed;
    }

    set registrationFailed(value:Error) {
        this._registrationFailed = value;
    }

    @Notify
    get isRegistering():boolean {
        return this._isRegistering;
    }

    set isRegistering(value:boolean) {
        this._isRegistering = value;
    }
}