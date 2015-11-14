import * as Rx from 'rx';

export class LoginStateModel implements wu.model.state.ILoginStateModel {

    private _errorMessage: string = '';
    private _email: string =  '';
    private _emailErrors: Array<string> = [];
    private _passwordErrors:Array<string> = [];
    private _user: wu.model.data.IUser = null;
    private _changeStateStream : Rx.Subject<LoginStateModel>;

    constructor() {
        this._changeStateStream = new Rx.Subject<LoginStateModel>();
    }

    notifyStateChange(){
        this._changeStateStream.onNext(this);
    }

    get errorMessage():string {
        return this._errorMessage;
    }

    set errorMessage(value:string) {
        this._errorMessage = value;
        this.notifyStateChange();
    }

    get email():string {
        return this._email;
    }

    set email(value:string) {
        this._email = value;
        this.notifyStateChange();
    }

    get emailErrors():Array<string> {
        return this._emailErrors;
    }

    set emailErrors(value:Array<string>) {
        this._emailErrors = value;
        this.notifyStateChange();
    }

    get passwordErrors():Array<string> {
        return this._passwordErrors;
    }

    set passwordErrors(value:Array<string>) {
        this._passwordErrors = value;
        this.notifyStateChange();
    }

    get user():wu.model.data.IUser {
        return this._user;
    }

    set user(value:wu.model.data.IUser) {
        this._user = value;
        this.notifyStateChange();
    }

    get changeStateStream():Rx.Subject<LoginStateModel> {
        return this._changeStateStream;
    }

    set changeStateStream(value:Rx.Subject<LoginStateModel>) {
        this._changeStateStream = value;
    }
}