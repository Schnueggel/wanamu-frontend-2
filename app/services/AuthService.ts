import * as _ from 'lodash';
import * as axios from 'axios';
import * as Rx from 'rx';
import * as Err from '../errors/errors';

export interface LoginRequestData {
    username: string;
    password: string;
}

export class AuthService {

    private loginRequestStream:Rx.Observable<boolean>;
    private axios:axios.AxiosInstance;

    constructor() {
        this.createAxios();
    }

    createAxios() {
        this.axios = axios.create();
        this.axios.interceptors.response.use(null, this.onResponseError.bind(this));
    }

    /**
     *
     * @param response
     * @returns {any}
     */
    onResponseError(response: axios.Response) {
        if (response.status === 401 || response.status === 403) {
            return Promise.resolve(new Err.CredentialsError());
        } else if ( response.status === 500) {
            return Promise.resolve(new Err.ServerError());
        } else if (response.status === 0) {
            return Promise.resolve(new Err.NetworkError());
        } else {
            console.error(response);
            return Promise.resolve(new Err.UnknownError('Server responded with: ' + response.statusText));
        }
    }
    /**
     *
     * @param obs
     * @returns {Rx.Observable<boolean>}
     */
    createLoginRequestStream(obs:Rx.Observable<LoginRequestData>):Rx.Observable<boolean> {
        if (this.loginRequestStream === undefined) {
            this.loginRequestStream = obs
                .flatMapLatest((data: LoginRequestData) => this.getLoginStream('http://localhost:3001/auth/login', data))
                .catch((e: Error) => {
                    console.error(e);
                    return Rx.Observable.just(new Err.UnknownError('An unknown error happened'));
                })
                .map((response: axios.Response) => {
                    if (response instanceof Err.BaseError) {
                        console.error(response);
                        return response;
                    } else {
                        return response.data;
                    }
                });
        }

        return this.loginRequestStream;
    }

    /**
     *
     * @param url
     * @param data
     * @returns {Rx.Observable<axios.Response>}
     * @throws NetworkError|UnknownError|ServerError|CredentialsError
     */
    getLoginStream(url: string, data: LoginRequestData): Rx.Observable<axios.Response>  {
        return Rx.Observable
            .fromPromise(this.axios.post(url, data));
    }
}
const authService = new AuthService();

export default authService;