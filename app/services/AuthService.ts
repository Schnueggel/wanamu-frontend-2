import * as _ from 'lodash';
import {Observable} from 'rx';
import * as Err from '../errors/errors';
import {User, Profile, Setting} from '../models/data/models';
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
                return Observable.just(new Err.UnknownError('An unknown error happened'));
            })
            .map((response:LoginResponse) => {
                if (response instanceof Err.BaseError) {
                    console.error(response);
                    return response as any;
                } else if (_.get(response, '.data.data[0].id', false) === false) {
                    return new Err.InvalidResponseDataError();
                } else {
                    return this.mapUserDataToUser(response.data.data[0]);
                }
            });
    }

    /**
     *
     * @param obs
     * @returns {Observable<boolean>}
     * @throws NetworkError|UnknownError|ServerError|InvalidResponseDataError
     */
    createLogoutRequestStream(obs: Rx.Observable<any>):Rx.Observable<boolean|Error> {
        return obs
            .flatMapLatest(() => {
                return Observable
                    .fromPromise(this.axios.post(`http://localhost:3001/auth/logout`, {}))
            })
            .catch((e:Error) => {
                console.error(e);
                return Observable.just(new Err.UnknownError('An unknown error happened'));
            })
            .map((response:LoginResponse) => {
                if (response instanceof Err.BaseError) {
                    console.error(response);
                    return response as any;
                } else if (_.get(response, '.data.success', false) === false) {
                    return new Err.InvalidResponseDataError();
                } else {
                    return true;
                }
            });
    }

    /**
     *
     * @returns {Observable<wu.model.data.IUser>}
     */
    createCurrentUserRequestStream(): Rx.Observable<wu.model.data.IUser> {
        return Observable.just(0)
            .flatMapLatest((id) => {
                return Observable
                    .fromPromise(this.axios.get(`http://localhost:3001/user/${id}`));
            })
            .map((response:LoginResponse) => {
                if (_.get(response, '.data.data[0].id', false)) {
                    return this.mapUserDataToUser(response.data.data[0]);
                }
                return null;
            });
    }

    /**
     *
     * @param url
     * @param data
     * @returns {Observable<axios.Response>}
     * @throws NetworkError|UnknownError|ServerError|CredentialsError
     */
    getLoginStream(url:string, data:LoginRequestData):Rx.Observable<axios.Response> {
        return Observable
            .fromPromise(this.axios.post(url, data));
    }

    /**
     *
     * @param data
     */
    mapUserDataToUser(data: wu.model.data.IUserData) : wu.model.data.IUser {
        return new User({
            id: data.id,
            email: data.email,
            DefaultTodoListId: data.DefaultTodoListId,
            Setting: new Setting(data.Setting),
            Profile: new Profile(data.Profile)
        });
    }
}

const authService = new AuthService();

export default authService;