import * as _ from 'lodash';
import {Observable} from 'rx';
import * as Err from 'errors/errors';
import {User} from 'models/data/models';
import {BaseDataService} from './BaseDataService';
import AppState from '../models/states/AppStateModel';

export interface IRegistrationRequestData {
    email: string;
    firstname: string;
    lastname: string;
    salutation: string;
    password: string;
}

export interface IRegistrationResponse extends axios.Response {
    data: {data: Array<wu.model.data.IUserData>};
}

/**
 *
 */
export class RegistrationService extends BaseDataService {

    constructor() {
        super();
    }

    /**
     *
     * @param obs
     * @returns {Rx.Observable<boolean>}
     * @throws NetworkError|UnknownError|ServerError|CredentialsError|InvalidResponseDataError
     */
    createRegistrationRequestStream(obs:Rx.Observable<IRegistrationRequestData>):Rx.Observable<wu.model.data.IUser> {
        return obs
            .flatMapLatest((data:IRegistrationResponse) => this.axios.post(`${AppState.config.apiBaseUrl}/user`, {
                data
            }))
            .catch((e:Error) => {
                console.error(e);
                return Observable.just(new Err.UnknownError('An unknown error happened'));
            })
            .map((response:IRegistrationResponse) => {
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

}

const registerService = new RegistrationService();

export default registerService;