declare module wu {

    module model.states {
        interface IBaseStateModel<T> {
            changeStateStream: Rx.Observable<T>;
            notify(): void;
        }

        interface ILoginStateModel extends IBaseStateModel<ILoginStateModel> {
            errorMessage: string;
            email : string;
            emailErrors : Array<string>;
            passwordErrors : Array<string>;
            user: wu.model.data.IUser;
            logoutFailed:Error;
            isLoggingOut:boolean;
        }

        interface IRegisterStateModel extends IBaseStateModel<IRegisterStateModel> {
            registrationSuccess: boolean;
            registrationFailed:Error;
            isRegistering:boolean;
        }

        interface IAppStateModel extends IBaseStateModel<IAppStateModel> {

            authMenuItems: wu.IMenuItemData[];
            noAuthMenuItems: wu.IMenuItemData[];

            login: ILoginStateModel;
            todos: ITodoStateModel;
            register: IRegisterStateModel;

            isAuthedPath(path: string)

            menuItems:wu.IMenuItemData[];
            appReady: boolean;
            config: wu.model.data.IConfig;
            configError: Error;
            isBootstrapping: boolean;
            isConfigLoading: boolean;
            bootstrappingError: Error;
        }

        interface ITodoStateModel extends IBaseStateModel<ITodoStateModel> {
            todolist: wu.model.data.ITodoList;
            isTodoUpdating:boolean;
            todoUpdateCount:number;
            todoListNotFound:boolean;
            isTodoListLoading:boolean;
        }
    }

    interface  IDirty {
        dirty : boolean;
    }

    module model.data {

        interface IBaseModel<T> extends IDirty {
            [index: string] : any;
            toJSON : Function;
            fromJSON : (data:any) => void;
            changeDataStream: Rx.Subject<T>
        }

        interface IConfig {
            apiBaseUrl: string;
        }

        interface IUserClass {
            id?: number;
            password?: string;
            email: string;
            Setting?: ISetting;
            Profile : IProfile;
            DefaultTodoListId?: number;
        }

        type IUser = IUserClass & Immutable.Record.TypedMap<IUserClass>;

        interface ITodoClass {
            _id?: number;
            todolistId: number,
            title: string;
            description: string;
            sorting?: number;
            owner?: string;
            finished: boolean;
            deletedAt?: string;
            updatedAt?: string;
            createdAt?: string;
            color?: string;
            parent?: string;
            shared?: string[];
            accepted?: boolean;
        }

        type ITodo = ITodoClass;

        interface IFriend extends IBaseModel<IFriend> {
            id: number;
            Profile : IProfile;
            Friends : IFriendsData;
        }

        interface IColor {
            color1 : string;
            color2 : string;
            color3 : string;
            color4 : string;
            color5 : string;
        }

        interface ITodoListClass {
            id?: number;
            name : string;
            Todos : Immutable.Map<any,ITodo>;
        }

        type ITodoList = ITodoListClass & Immutable.Record.TypedMap<ITodoListClass>;

        interface IProfileClass {
            id?: number;
            firstname: string;
            lastname: string;
            salutation: string;
            face?: string;
        }
        type IProfile = IProfileClass & Immutable.Record.TypedMap<IProfileClass>;

        interface ISettingClass extends IColor {
            id : number;
        }

        type ISetting = ISettingClass & Immutable.Record.TypedMap<ISettingClass>;

        interface ITodoListData {
            id : number;
            name : string;
            Todos : Array<ITodo>;
        }

        interface IFriendData {
            id : number;
            Profile : IProfileData;
            Friends : IFriendsData;
        }

        interface IFriendsData {
            accepted : boolean
        }

        interface IUserData {
            id?: number;
            email: string;
            password?: string;
            Setting?: ISettingData;
            Profile: IProfileData;
            DefaultTodoListId?: number;
        }

        interface ITodoData {
            id : number;
            TodoListId: number;
            title : string;
            description : string;
            alarm : string;
            repeat : boolean;
            finished : boolean;
            repeatWeekly: string[];
            repeatMonthly: string[];
            repeatYearly: string[];
            order : number;
            deletedAt: string;
            updatedAt: string;
            createdAt: string;
            color: string;
        }

        interface IProfileData {
            id?: number;
            firstname : string;
            lastname : string;
            salutation : string;
            face?: string;
        }

        interface ISettingData {
            id : number;
            color1: string;
            color2: string;
            color3: string;
            color4: string;
            color5: string;
        }
    }
}