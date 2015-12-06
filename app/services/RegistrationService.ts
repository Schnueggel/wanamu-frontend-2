import * as _ from 'lodash';
import { Observable } from 'rx';
import * as Err from 'errors/errors';
import { BaseDataService } from './BaseDataService';
import { configService } from 'services/ConfigService';

import IUser = wu.model.data.IUser;
import IRegistrationResponse = wu.services.IRegistrationResponse;

/**
 * @class RegistrationService
 * @namespace wu.services
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
    createRegistrationRequestStream(obs: Observable<IUser>): Observable<IUser> {
        return obs
            .flatMapLatest((data: IUser) => {
                return Observable.fromPromise(this.axios.post(`http://localhost:3001/user`, {
                    data: data.toJS()
                }));
            })
            .catch((e: Error) => {
                console.error(e);
                return Observable.just(new Err.UnknownError('An unknown error happened'));
            })
            .map((response: IRegistrationResponse) => {
                if (response instanceof Err.BaseError) {
                    console.error(response);
                    return response as any;
                } else if (_.get(response, '.data.data[0].id', false) === false) {
                    return new Err.InvalidResponseDataError();
                } else {
                    return this.mapUserData(response.data.data[0]);
                }
            });
    }
}

export const registerService = new RegistrationService();