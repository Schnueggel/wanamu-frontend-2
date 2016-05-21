declare module wu {

    module model.data {

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

        interface IFriend {
            _id: string;
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

    module model.view {
        interface ITodoView extends model.data.ITodo {
            editDescription: boolean;
            editColor: boolean;
            editTitle: boolean;
        }
    }
}
