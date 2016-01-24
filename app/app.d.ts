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
        children?: any,
        location?: Location;
        history?: HistoryModule.History
    }

    interface IPageProps extends IControlProps<IPageProps> {
        app: IAppState;
        login: ILoginState;
        menuToggle: __React.MouseEventHandler;
    }

    interface ILoginProps extends IControlProps<ILoginProps> {
        app: IAppState;
        login: ILoginState;
        actions: {
            login: __React.MouseEventHandler
        };

        params: {
            id?: number
        };
    }

    export interface IMenuProps extends IControlProps<IMenuProps> {
        title: string;
        items: Array<wu.IMenuItemData>;
        className: string;
    }

    interface IAppState {
        isLoading: boolean;
        user: any;
        appState: number;
        menuOpen: boolean
    }

    interface ILoginState {
        error: string;
    }
}

declare module 'isomorphic-fetch' {
    namespace fetch {
        interface Window {
            fetch(url: string|Request, init?: RequestInit): Promise<Response>;
        }
    }
    export = fetch;
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