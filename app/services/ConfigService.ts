import {BaseDataService} from './BaseDataService';
import {Config} from 'models/data/Config';
import {Observable} from 'rx';

export class ConfigService extends BaseDataService {

    configUrl:string = '/config.json';

    constructor() {
        super();
    }

    createConfigRequestStream(obs: Observable<any>): Observable<Error|wu.model.data.IConfig> {
        return obs
            .flatMap( () => Observable.fromPromise(this.axios.get(this.configUrl)))
            .map((data: Error|any) => {
                if (data instanceof Error) {
                    return data as Error;
                } else {
                    return new Config(data);
                }
            });
    }
}

export const configService = new ConfigService();

