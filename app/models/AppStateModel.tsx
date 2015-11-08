import MenuModel from './MenuModel';
import * as Rx from 'rx';
import * as Q from 'q';

export interface LoginState {
    isEmailValid : boolean,
    emailErrors : Array<string>,
    isPasswordValid : boolean,
    isFormValid : boolean,
    passwordErrors : Array<string>
}

export class AppStateModel {
    menu: any;
    login: LoginState = {
        isEmailValid : false,
        emailErrors : [],
        isPasswordValid : false,
        isFormValid : false,
        passwordErrors : []
    };

    loginStateChangedStream: Rx.Subject<LoginState>;

    constructor() {
        this.menu = new MenuModel();
        this.loginStateChangedStream = new Rx.Subject<LoginState>();
    }

    /**
     * This code is here for testing purpose it should be moved to a LoginService
     * @param observable
     * @returns {Observable<TResult>}
     */
    createLoginResponseStream(observable: Rx.Observable<{email:string,password:string}>) : Rx.Observable<boolean> {
        return observable
            .flatMap((data:{email:string,password:string}) => {
                return Rx.Observable.fromPromise(Q.fcall<boolean>(() => {
                    console.log('Do Login');
                    return true;
                }));
            })
            .map((result:boolean) => {
                console.log('Login done:' + result);
                return result;
            });
    }

    notifyLoginState() {
        this.loginStateChangedStream.onNext(this.login);
    }
}

const AppState = new AppStateModel();

export default AppState;