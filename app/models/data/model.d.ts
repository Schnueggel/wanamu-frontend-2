declare module wu {

    module model.data {

        interface  IDirty {
            dirty : boolean;
        }

        interface IBaseModel extends IDirty {
            [index: string] : any;
            toJSON : Function;
            fromJSON : (data: any) => void;
        }

        interface IFriendData {
            id : number;
            Profile : IProfileData;
            Friends : IFriendsData;
        }

        interface IFriendsData {
            accepted : boolean
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

        interface ITodo extends IBaseModel {
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

        interface IFriend {
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

        interface ITodoList {
            id : number;
            name : string;
            Todos : Array<ITodo>;
            addNewTodo(todo: ITodo) : void;
        }

        interface ISettingData {
            id : number;
            color1: string;
            color2: string;
            color3: string;
            color4: string;
            color5: string;
        }

        interface IProfile extends IProfileData, IBaseModel {
            fromJSON( data : IProfileData ) : void;
        }

        interface ISetting extends IBaseModel,IColor {
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

        interface IUserData {
            id : number;
            email: string;
            TodoLists : Array<ITodoListData>
            Setting: ISettingData;
            Profile : IProfileData;
            DefaultTodoListId : number;
        }

        interface IUser extends IBaseModel {
            password : string;
            id : number;
            email: string;
            TodoLists : Array<ITodoList>
            Setting: ISetting;
            Profile : IProfile;
            DefaultTodoListId : number;
            defaulttodolist : ITodoList;
            usertype : string;

            todos(id?: number) : Array<ITodo>;
            addNewTodo( todo : ITodo, todolist?: ITodoList ) : void;
            fromJSON( data : IUserData ) : void;
        }
    }
}
