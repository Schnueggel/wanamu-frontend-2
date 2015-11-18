import * as Rx from 'rx';
import {BaseStateModel} from "./BaseStateModel";
import {Notify} from './decorators/NotifyDecorator';

export class LoginStateModel extends BaseStateModel<LoginStateModel> implements wu.model.state.ILoginStateModel {

    private _errorMessage: string = '';
    private _email: string =  '';
    private _emailErrors: Array<string> = [];
    private _passwordErrors:Array<string> = [];
    private _user: wu.model.data.IUser = null;

    constructor() {
        super();
    }

    @Notify
    get errorMessage():string {
        return this._errorMessage;
    }

    set errorMessage(value:string) {
        this._errorMessage = value;
    }

    @Notify
    get email():string {
        return this._email;
    }

    set email(value:string) {
        this._email = value;
    }

    @Notify
    get emailErrors():Array<string> {
        return this._emailErrors;
    }

    set emailErrors(value:Array<string>) {
        this._emailErrors = value;
    }

    @Notify
    get passwordErrors():Array<string> {
        return this._passwordErrors;
    }

    set passwordErrors(value:Array<string>) {
        this._passwordErrors = value;
    }

    @Notify
    get user():wu.model.data.IUser {
        return this._user;
    }

    set user(value:wu.model.data.IUser) {
        this._user = value;
    }
}