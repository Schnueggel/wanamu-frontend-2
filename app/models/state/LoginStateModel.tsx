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

    get errorMessage():string {
        return this._errorMessage;
    }
    @Notify
    set errorMessage(value:string) {
        this._errorMessage = value;
    }

    get email():string {
        return this._email;
    }
    @Notify
    set email(value:string) {
        this._email = value;
    }

    get emailErrors():Array<string> {
        return this._emailErrors;
    }
    @Notify
    set emailErrors(value:Array<string>) {
        this._emailErrors = value;
    }

    get passwordErrors():Array<string> {
        return this._passwordErrors;
    }
    @Notify
    set passwordErrors(value:Array<string>) {
        this._passwordErrors = value;
    }

    get user():wu.model.data.IUser {
        return this._user;
    }
    @Notify
    set user(value:wu.model.data.IUser) {
        this._user = value;
    }
}