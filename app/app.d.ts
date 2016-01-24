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

    import RouteActions = ReduxSimpleRouter.RouteActions;
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
        user: IUserState;
        login: ILoginState;
        menuToggle: __React.MouseEventHandler;
    }

    interface ILoginProps extends IControlProps<ILoginProps> {
        user: IUserState;
        login: ILoginState;
        actions: {
            routeActions: RouteActions,
            login: __React.MouseEventHandler
        };

        params: {
            id?: number
        };
    }

    export interface ILogoutProps extends wu.IControlProps<ILogoutProps> {
        actions: {
            routeActions: RouteActions,
            logout: () => void
        };
    }

    export interface ITodoListProps extends wu.IControlProps<ITodoListProps>  {
        todolist: ITodoListState;
        actions: {
            routeActions: RouteActions;
            todolist: {
                todoListLoad: (id: string) => void
            };
        }
        params: {
            id?: string
        };
    }

    export interface IMenuProps extends IControlProps<IMenuProps> {
        title: string;
        items: Array<wu.IMenuItemData>;
        className: string;
    }

    interface IUserState {
        error: string;
        user: any;
        isLoading: boolean;
    }

    interface IAppState {
        isLoading: boolean;
        user: any;
        error: string;
        config: any;
        appState: number;
        menuOpen: boolean
    }

    interface ITodoListState {
        error: string;
        todolist: any;
        isLoading: boolean;
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