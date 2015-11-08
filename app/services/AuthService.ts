import * as axios from 'axios';
import * as Rx from 'rx';


export interface LoginRequestData {
    email: string;
    password: string;
}

export class AuthService {

    private loginRequestStream:Rx.Observable<boolean>;

    createLoginRequestStream(obs:Rx.Observable<LoginRequestData>):Rx.Observable<boolean> {
        if (this.loginRequestStream === undefined) {
            this.loginRequestStream = obs
                .flatMap((data:LoginRequestData) => {
                    return Rx.Observable.fromPromise(axios.post('http://localhost:3000/auth/login', {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data
                    }));
                })
            .map((response: axios.Response) => {
                if (response instanceof Error) {
                    console.error(response);
                    return false;
                }
                if (response.status === 200) {
                    return true;
                } else {
                    return false;
                }
            });
        }

        return this.loginRequestStream;
    }
}

const authService = new AuthService();

export default authService;