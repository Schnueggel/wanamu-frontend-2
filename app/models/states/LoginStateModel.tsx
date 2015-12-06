import * as Rx from 'rx';
import {loginAction, logoutAction, userAction, registerAction} from 'actions/actions';
import {BaseStateModel} from 'models/states/BaseStateModel';
import {Notify} from 'models/decorators/NotifyDecorator';
import {NotFoundError} from 'errors/NotFoundError';
import IUser = wu.model.data.IUser;

export class LoginStateModel extends BaseStateModel<LoginStateModel> implements wu.model.states.ILoginStateModel {

    private _errorMessage: string = '';
    private _email: string =  '';
    private _emailErrors: Array<string> = [];
    private _passwordErrors:Array<string> = [];
    private _user: wu.model.data.IUser = null;
    private _logoutFailed: Error = null;
    private _isLoggingOut: boolean = false;
    private _authCheckError: Error = null;
    private _isAuthChecking: boolean = false;

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

        userAction.userRequestStartSubject.subscribe( () => this.isAuthChecking = true );

        userAction.userRequestErrorStream.subscribe( err => {
            this.authCheckError = err;
            this.isAuthChecking = false;
        });

        userAction.userRequestSuccessStream.subscribe( (user: wu.model.data.IUser) => {
            this.isAuthChecking = false;
            this.user = user;
        });
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

    @Notify
    get authCheckError():Error {
        return this._authCheckError;
    }

    set authCheckError(value:Error) {
        this._authCheckError = value;
    }

    @Notify
    get isAuthChecking():boolean {
        return this._isAuthChecking;
    }

    set isAuthChecking(value:boolean) {
        this._isAuthChecking = value;
    }
}