import * as axios from 'axios';
import * as Rx from 'rx';

export interface LoginRequestData {
    email: string;
    password: string;
}

export class AuthService {

    private loginRequestStream:Rx.Observable<boolean>;
    private axios: axios.AxiosStatic;

    constructor() {
        this.createAxios();
    }

    createAxios() {
        this.axios = axios.create();
        this.axios.interceptors.response.use(this.onAxiosResponse.bind(this), this.onAxiosError.bind(this));
    }

    onAxiosResponse(response: axios.Response) {
        console.log(response);
    }

    onAxiosError(error: axios.Response) {
        console.log(error);
    }

    /**
     *
     * @param obs
     * @returns {Rx.Observable<boolean>}
     */
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
                return true
            });
        }

        return this.loginRequestStream;
    }
}

const authService = new AuthService();

export default authService;