import * as Rx from 'rx';
import {loginAction, logoutAction, userAction} from 'actions/actions';
import {BaseStateModel} from 'models/state/BaseStateModel';
import {Notify} from 'models/decorators/NotifyDecorator';

export class RegisterStateModel extends BaseStateModel<RegisterStateModel> implements wu.model.state.IRegisterStateModel {

    private _registrationSuccess:boolean;
    private _registrationFailed:Error;
    private _isRegistering:boolean;

    constructor() {
        super();
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