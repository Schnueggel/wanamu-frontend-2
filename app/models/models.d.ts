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
            todos: wu.model.data.ITodo[];
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
            WU_API_BASE_URL: string;
        }

        interface IUser {
            _id?: string;
            firstname: string,
            lastname:string,
            salutation: string,
            username: string,
            email: string,
            isAdmin: boolean,
            password: string,
            avatar: string,
            ignorelist: Array<string>,
            friends: Array<string>,
            defaultTodolistId: string
        }

        interface ITodo {
            _id?: string;
            todolistId: string,
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

        interface IFriend extends IBaseModel<IFriend> {
            _id: number;
            firstname?: string;
            lastname?: string;
            salutation?: string;
            username : string;
            pending: boolean;
            invitation: boolean;
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
