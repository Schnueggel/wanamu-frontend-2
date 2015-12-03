import * as Rx from 'rx';
import {loginAction, logoutAction} from 'actions/actions';
import {BaseStateModel} from 'models/state/BaseStateModel';
import {Notify} from 'models/decorators/NotifyDecorator';
import {NotFoundError} from "../../errors/NotFoundError";

export class LoginStateModel extends BaseStateModel<LoginStateModel> implements wu.model.state.ILoginStateModel {

    private _errorMessage: string = '';
    private _email: string =  '';
    private _emailErrors: Array<string> = [];
    private _passwordErrors:Array<string> = [];
    private _user: wu.model.data.IUser = null;
    private _logoutFailed: Error = null;
    private _isLoggingOut: boolean = false;

    constructor() {
        super();

        loginAction.loginRequestSuccessStream.subscribe( user => {
            this.user = user;
            this.logoutFailed = null;
        });

        logoutAction.logoutRequestSuccessStream.subscribe( () => {
            this.user = null;
            this.logoutFailed = null;
        });

        logoutAction.logoutRequestStream.subscribe( () => {
            this.isLoggingOut = false;
        });

        logoutAction.logoutRequestStartSubject.subscribe(()=> {
           this.isLoggingOut = true;
        });

        logoutAction.logoutRequestErrorStream.subscribe( (err) => this.logoutFailed = err );
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


    @Notify
    get logoutFailed():Error {
        return this._logoutFailed;
    }

    set logoutFailed(value:Error) {
        this._logoutFailed = value;
    }

    @Notify
    get isLoggingOut():boolean {
        return this._isLoggingOut;
    }

    set isLoggingOut(value:boolean) {
        this._isLoggingOut = value;
    }
}