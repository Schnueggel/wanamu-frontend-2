import {Observable, Subject} from 'rx';
import {configService} from 'services/ConfigService';
import {Config} from 'models/data/Config';

export class ConfigAction {

    configRequestStartSubject: Subject<any>;
    configRequestStream: Observable<Error|wu.model.data.IConfig>;
    configRequestSuccessStream: Observable<wu.model.data.IConfig>;
    configRequestErrorStream: Observable<Error>;

    constructor() {
        this.configRequestStartSubject = new Subject<any>();
        this.configRequestStream = configService.createConfigRequestStream(this.configRequestStartSubject).publish().refCount();

        this.configRequestErrorStream = this.configRequestStream
            .filter( (err: any) => err instanceof Error ) as Observable<Error>;

        this.configRequestSuccessStream = this.configRequestStream
                .filter( (config: Config) => config instanceof Config) as Observable<Config>;
    }

    doLoadConfig() {
        this.configRequestStartSubject.onNext(null);
    }
}

export const configAction = new ConfigAction();