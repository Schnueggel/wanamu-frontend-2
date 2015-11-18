import * as _ from 'lodash';
import * as Rx from 'rx';
import * as Err from '../errors/errors';
import {User} from '../models/data/models';
import {BaseDataService} from "./BaseDataService";

export interface LoginRequestData {
    username: string;
    password: string;
}

export interface LoginResponse extends axios.Response {
    data: {data: Array<wu.model.data.IUserData>};
}

/**
 *
 */
export class AuthService extends BaseDataService {

    constructor() {
        super();
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
                } else if (_.get(response, '.data.data[0].id', false) === false) {
                    return new Err.InvalidResponseDataError();
                } else {
                    return new User(response.data.data[0]);
                }
            });
    }

    /**
     *
     * @returns {Rx.Observable<wu.model.data.IUser>}
     */
    createCurrentUserRequestStream(): Rx.Observable<wu.model.data.IUser> {
        return Rx.Observable.just(0)
            .flatMapLatest((id) => {
                return Rx.Observable
                    .fromPromise(this.axios.get(`http://localhost:3001/user/${id}`));
            })
            .map((response:LoginResponse) => {
                if (_.get(response, '.data.data[0].id', false)) {
                    return new User(response.data.data[0]);
                }
                return null;
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