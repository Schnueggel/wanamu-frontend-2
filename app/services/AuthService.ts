import * as _ from 'lodash';
import * as axios from 'axios';
import * as Rx from 'rx';
import * as Err from '../errors/errors';
import {User} from '../models/data/models';

export interface LoginRequestData {
    username: string;
    password: string;
}

export interface LoginResponse extends axios.Response {
    data: {data: Array<wu.model.data.IUserData>};
}

export class AuthService {

    private axios:axios.AxiosInstance;
    private currentUser:wu.model.data.IUser;

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
    onResponseError(response:axios.Response) {
        if (response.status === 401 || response.status === 403) {
            return Promise.resolve(new Err.CredentialsError());
        } else if (response.status === 500) {
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
     * @throws NetworkError|UnknownError|ServerError|CredentialsError|InvalidResponseDataError
     */
    createLoginRequestStream(obs:Rx.Observable<LoginRequestData>):Rx.Observable<wu.model.data.IUser> {
        return obs
            .flatMapLatest((data:LoginRequestData) => this.getLoginStream('http://localhost:3001/auth/login', data))
            .catch((e:Error) => {
                console.error(e);
                return Rx.Observable.just(new Err.UnknownError('An unknown error happened'));
            })
            .map((response:LoginResponse) => {
                if (response instanceof Err.BaseError) {
                    console.error(response);
                    return response as any;
                } else if (_.get(response, '.data.data[0].id', false) === false){
                    return new Err.InvalidResponseDataError();
                } else {
                    this.currentUser = new User(response.data.data[0]);
                    return this.currentUser;
                }
            });
    }

    /**
     *
     * @param url
     * @param data
     * @returns {Rx.Observable<axios.Response>}
     * @throws NetworkError|UnknownError|ServerError|CredentialsError
     */
    getLoginStream(url:string, data:LoginRequestData):Rx.Observable<axios.Response> {
        return Rx.Observable
            .fromPromise(this.axios.post(url, data));
    }
}

const authService = new AuthService();

export default authService;