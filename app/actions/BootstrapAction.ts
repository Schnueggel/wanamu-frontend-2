import {Observable, Subject} from 'rx';
import {configAction} from 'actions/ConfigAction';
import {configService} from 'services/ConfigService';

/**
 * @class BootstrapAction
 * @namespace wu.actions
 */
export class BootstrapAction {

    bootstrapRequestStream: Observable<any>;
    bootstrapRequestSuccessStream: Observable<any>;
    bootstrapRequestErrorStream: Observable<Error>;
    bootstrapRequestStartStream: Observable<any>

    constructor() {
        this.bootstrapRequestStartStream = configAction.configRequestStartSubject;
        this.bootstrapRequestStream = configAction.configRequestStream;
        this.bootstrapRequestErrorStream = configAction.configRequestErrorStream;
        this.bootstrapRequestSuccessStream = configAction.configRequestSuccessStream;
    }

    /**
     * Bootstraps the application
     */
    doBootstrap() {
        //At the moment the bootstrapping is only dependend on config loading
        configAction.doLoadConfig();
    }
}

export const bootstrapAction = new BootstrapAction();