declare function require(url:string);

declare const module: {
    hot?: {
        accept: Function
    }
};

declare module wu {

    module Form {
        interface IRadioButton extends IInputElementProps<IRadioButton> {
            label: string;
            checked?: boolean;
            value: string;
            id: string;
        }

        interface ISelectProps extends IInputElementProps<ITextInputProps> {
            pattern?: RegExp;
            options: Array<IOption>;
        }

        interface IOption {
            key: any;
            value: any;
        }

        interface ITextInputProps extends IInputElementProps<ITextInputProps> {
            pattern?: RegExp;
            type?: string;
        }

        interface ITextAreaProps extends IInputElementProps<ITextAreaProps> {
            rows?: number;
        }

        interface IInputElementProps<T> extends __React.Props<T> {
            value?: string;
            className?: string;
            label?: string;
            id?: string;
            name?: string;
            placeholder?: string;
            hide?: boolean;
            errors?: Array<string>;
            onChange?: (data: {valid: boolean, value: string}) => void;
            onBlur?: (ev?:__React.FormEvent) => any;
        }
    }

    interface IMenuItemData {
        text: string;
        url: string;
    }

    interface IContext {
        router: HistoryModule.History;
    }

    interface IControlProps<T> extends __React.Props<T> {
        children?: any,
        location?: HistoryModule.Location;
        history?: HistoryModule.History
    }

    interface IPageProps extends IControlProps<IPageProps> {
        app: IAppState;
        user: IUserState;
        login: ILoginState;
        menu: IMenuState;
        friends: IFriendsState;
        actions: {
            menuToggle: __React.MouseEventHandler;
            routerActions: ReactRouterRedux.RouteActions,
            hideAddFriendPopup: Function,
            login: __React.MouseEventHandler
        };
    }

    interface ILoginProps extends IControlProps<ILoginProps> {
        user: IUserState;
        login: ILoginState;
        actions: {
            routerActions: ReactRouterRedux.RouteActions,
            login: __React.MouseEventHandler
        };

        params: {
            id?: number
        };
    }

    interface IFriendProps extends IControlProps<IFriendProps> {
        friends: IFriendsState;
        actions: {
            routerActions: ReactRouterRedux.RouteActions;
            fla: IFriendListActions
        };

    }

    interface IRegisterProps extends wu.IControlProps<IRegisterProps> {
        register: IRegisterState;
        actions: {
            routerActions: ReactRouterRedux.RouteActions,
            register: (data: any) => void,
            usernameCheck: (name: string) => void
        };
    }

    interface ILogoutProps extends wu.IControlProps<ILogoutProps> {
        actions: {
            routerActions: ReactRouterRedux.RouteActions,
            requestLogout: () => void,
        };
    }

    interface ITodoListProps extends wu.IControlProps<ITodoListProps>  {
        todolist: ITodoListState;
        user: IUserState;
        visibility: string;

        actions: {
            routerActions: ReactRouterRedux.RouteActions;
            todo: ITodoActions
            todolist:ITodoListActions
        }
        params: {
            id?: string;
            visible?: string;
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
        friends: Array<any>;
        error: string;
        deleteError: string;
        isLoading: boolean;
        isAdding: boolean
        isFriendsPopupVisible: boolean;
        friendsDeleting: Immutable.Set<string>;
        friendsAccepting: Immutable.Set<string>;
    }

    interface IMenuState {
        menuItems: wu.IMenuItemData[]
    }

    interface IUserState {
        error: string;
        user: model.data.IUser;
        isLoading: boolean;
        invitations: number;
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
        config: IConfig;
        failedLocation: string;
        isSigningIn: boolean;
        configLoading: boolean;
        configError: string;
        menuOpen: boolean;
        userTested: boolean;
        isNotificationPopupVisible: boolean;
        latestNotifications: Array<wu.model.data.INotification>;
    }

    interface ITodoListState {
        visibility: string;
        id: string;
        error: string;
        isLoading: boolean;
        todos: Immutable.Map<string, model.view.ITodoView>;
        isTodoSyncing: boolean;
        syncingTodos: Immutable.Set<model.data.ITodo>;
    }

    interface ILoginState {
        error: string;
    }

    interface ITodoActions {
        todoUpdateRequest(todo: model.view.ITodoView): void;
        todoCreateRequest(todo: model.view.ITodoView): void;
        todoDeleteRequest(todo: model.view.ITodoView): void;
        todoFinishRequest(todo: model.view.ITodoView): void;
        todoViewChange(todo: model.data.ITodo):void;
    }

    interface IFriendListActions {
        doLoadFriendList: () => void
        doDeleteFriend: (friend: model.data.IFriend) => void;
        doAcceptFriend: (friend: model.data.IFriend) => void;
        showAddFriendsPopup: () => void;
        hideAddFriendsPopup: () => void;
        doAddFriend: (usernameOrEmail: string) => any;
    }

    interface ITodoListActions {
        todoListVisibility(visibility: string):void;
        todoListRequest(id: string): void;
    }

    interface IConfig {
        WU_API_BASE_URL: string;
        STATE_LOG: string;
    }
}
