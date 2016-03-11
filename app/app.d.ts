/// <reference path="./components/Form/form.d.ts" />
/// <reference path="./models/models.d.ts" />

declare function require(url:string);

declare module wu {

    import RouteActions = ReactRouterRedux.RouteActions;

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
        menu: IMenuState;
        menuToggle: __React.MouseEventHandler;
    }

    interface ILoginProps extends IControlProps<ILoginProps> {
        user: IUserState;
        login: ILoginState;
        actions: {
            routerActions: RouteActions,
            login: __React.MouseEventHandler
        };

        params: {
            id?: number
        };
    }

    interface IFriendProps extends IControlProps<IFriendProps> {
        friends: any[];
    }

    interface IRegisterProps extends wu.IControlProps<IRegisterProps> {
        register: IRegisterState;
        actions: {
            routerActions: RouteActions,
            register: (data: any) => void,
            usernameCheck: (name: string) => void
        };
    }

    interface ILogoutProps extends wu.IControlProps<ILogoutProps> {
        actions: {
            routerActions: RouteActions,
            logout: () => void
        };
    }

    interface ITodoListProps extends wu.IControlProps<ITodoListProps>  {
        todolist: ITodoListState;
        user: IUserState;
        visibility: string;
        actions: {
            routerActions: RouteActions;
            todo: ITodoActions
            todolist:ITodoListActions
        }
        params: {
            id?: string
        };
    }

    interface IMenuProps extends IControlProps<IMenuProps> {
        title: string;
        items: Array<wu.IMenuItemData>;
        className: string;
    }

    interface IState {
        todolist: ITodoListState;
        auth: IAuthState;
        app: IAppState;
        user: IUserState;
        menu: IMenuState;
        friends: IFriendsState;
    }

    interface IFriendsState {
        friends: Array<any>
    }

    interface IMenuState {
        menuItems: wu.IMenuItemData[]
    }

    interface IUserState {
        error: string;
        user: model.data.IUser;
        isLoading: boolean;
    }

    interface IAuthState {
        token: string;
    }

    interface IRegisterState {
        error: string;
        user: any;
        isLoading: boolean;
        usernameState: number;
        isUserCheckLoading: boolean;
        formErrors: {[index:string]:string}
    }

    interface IAppState {
        appState: number;
        error: string;
        isLoading: boolean;
        loadingCounter: number;
        config: any;
        failedLocation: string;
        isSigningIn: boolean;
        configLoading: boolean;
        configError: string;
        menuOpen: boolean;
        userTested: boolean;
    }

    interface ITodoListState {
        visibility: string;
        id: string;
        error: string;
        isLoading: boolean;
        todos: Immutable.Map<string, model.data.ITodo>;
        isTodoSyncing: boolean;
        syncingTodos: Immutable.Set<model.data.ITodo>;
    }

    interface ILoginState {
        error: string;
    }

    interface ITodoActions {
        todoDoUpdate(todo: model.data.ITodo):void;
        todoDoCreate(todo: model.data.ITodo):void;
        todoCreate(todo: model.data.ITodo):void;
        todoDoDelete(todo: model.data.ITodo):void;
        todoDoFinish(todo: model.data.ITodo):void;
    }

    interface ITodoListActions {
        todoListVisibility(visibility: string):void;
        todoListLoad(id: string):void
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
