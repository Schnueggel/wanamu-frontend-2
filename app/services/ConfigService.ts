import {BaseDataService} from './BaseDataService';
import {Config} from 'models/data/Config';
import {Observable} from 'rx';
import {InvalidResponseDataError} from 'errors/InvalidResponseDataError';

import IConfig = wu.model.data.IConfig;



export class ConfigService extends BaseDataService {

    configUrl:string = '/config.json';

    config: IConfig = {} as IConfig;

    constructor() {
        super();

    }

    createConfigRequestStream(obs: Observable<any>): Observable<Error|IConfig> {
        return obs
            .flatMap( () => Observable.fromPromise(this.axios.get(this.configUrl)))
            .map((data: axios.Response) => {
                if (data instanceof Error) {
                    return data as Error;
                } else if (!data.data) {
                   return new InvalidResponseDataError();
                } else {
                    return new Config(data.data);
                }
            });
    }
}

export const configService = new ConfigService();

