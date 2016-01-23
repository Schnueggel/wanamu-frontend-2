/// <reference path="./components/Form/form.d.ts" />
/// <reference path="./models/models.d.ts" />
/// <reference path="./services/services.d.ts" />

// Material-Design-Lite
declare interface ComponentHandler {
    upgradeDom();
    upgradeElement(element: Element, jsClass?:string)
}

declare const componentHandler:ComponentHandler;

declare function require(url:string);

declare module wu {

    interface IMenuItemData {
        text: string;
        url: string;
    }

    interface IContext {
        router: HistoryModule.History;
    }

    interface IControlProps<T> extends __React.Props<T> {
        appState: wu.model.states.IAppStateModel;
        children: any,
        location: Location;
    }
}

declare namespace __React {
    /**
     * Declare Attributes that come from material-lite
     */
    interface HTMLAttributes {
        'for'?: string;
        'class'?: any;
        'hide'?: boolean;
    }
}

declare module 'history/lib/createBrowserHistory' {

    interface createBrowserHistory {
        (): History;
    }
    export default createBrowserHistory;
}

declare module axios {

    interface success {
        (response: Response) : void
    }
    interface error {
        error(error: Error) : void;
    }

    interface AxiosInstance {
        interceptors: {
            request: Interceptor,
            response: Interceptor
        }
    }

    interface AxiosStatic {
        interceptors: {
            request: Interceptor,
            response: Interceptor
        }
    }

    interface Interceptor {
        use(success :success, error?: error): void;
        eject(interceptor: Interceptor);
    }
}

declare module Immutable {
    export module Record {
        type IRecord<T> = T & TypedMap<T>;

        interface TypedMap<T> extends Map<string, any> {
            set(key: string, value: any): IRecord<T>;
            /**
             * Returns a new Map having set `value` at this `keyPath`. If any keys in
             * `keyPath` do not exist, a new immutable Map will be created at that key.
             */
            setIn(keyPath: Array<any>, value: any): IRecord<T>;
            setIn(KeyPath: Iterable<any, any>, value: any): IRecord<T>;
        }

        interface Factory<T> {
            new (): IRecord<T>;
            new (values: T): IRecord<T>;

            (): IRecord<T>;
            (values: T): IRecord<T>;
        }
    }

    export function Record<T>(
        defaultValues: T, name?: string
    ): Record.Factory<T>;
}