declare module wu {

    module model.state {
        export interface IBaseStateModel<T> {
            changeStateStream: Rx.Observable<T>;
            notify(): void;
        }
        export interface ILoginStateModel extends IBaseStateModel<ILoginStateModel> {
            errorMessage: string;
            email : string;
            emailErrors : Array<string>;
            passwordErrors : Array<string>;
            user: wu.model.data.IUser;
        }

        export interface ITodoStateModel extends IBaseStateModel<ITodoStateModel> {
            todolist: wu.model.data.ITodoList;
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

        interface IUser extends IBaseModel<IUser> {
            password : string;
            id : number;
            email: string;
            Setting: ISetting;
            Profile : IProfile;
            DefaultTodoListId : number;
            defaulttodolist : ITodoList;
            usertype : string;

            fromJSON(data:IUserData) : void;
        }

        interface ITodo extends IBaseModel<ITodo> {
            id : number;
            TodoListId: number,
            title : string;
            alarm : string;
            description : string;
            order : number;
            repeat : boolean;
            finished : boolean;
            deletedAt : string;
            color : string;
            repeatWeekly  : string[];
            repeatMonthly : string[];
            repeatYearly  : string[];
            /**
             * Maps the data to the model. this will not trigger the dirty flag
             * @param data
             */
            fromJSON(data:ITodoData) : void
        }

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

        interface ITodoList extends IBaseModel<ITodoList> {
            id : number;
            name : string;
            Todos : Array<ITodo>;
            todoChangeStream : Rx.Subject<wu.model.data.ITodo>;
            addNewTodo(todo:ITodo) : void;
        }

        interface IProfile extends IProfileData, IBaseModel<IProfile> {
            fromJSON(data:IProfileData) : void;
        }

        interface ISetting extends IBaseModel<ISetting>,IColor {
            id : number;

            /**
             * Returns all colors as an array
             * @returns {{}}
             */
            colors() : IColor;

            /**
             * Returns a single color with its value e.g.: rgba(0,0,0,0)
             * @param string color e.g.: color1, color2 ... color5
             * @returns {String} e.g.: rgba(0,0,0,0)
             */
            color(color:string) : string
        }

        interface ITodoListData {
            id : number;
            name : string;
            Todos : Array<ITodoData>;
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
            id : number;
            email: string;
            Setting: ISettingData;
            Profile : IProfileData;
            DefaultTodoListId : number;
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
            color: string;
        }

        interface IProfileData {
            id : number;
            firstname : string;
            lastname : string;
            salutation : string;
            face : string;
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