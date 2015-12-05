import _ = require('lodash');
import { Setting } from 'models/data/Setting';
import { TodoList } from 'models/data/TodoList';
import { TodoListNotFoundError } from './errors/TodoListNotFoundError';
import { Todo } from 'models/data/Todo';
import { Profile } from 'models/data/Profile';
import { BaseModel }  from 'models/data/BaseModel';
import { Dirty, Json } from 'models/decorators/decorators';

export class User extends BaseModel<User> implements wu.model.data.IUser {

    public static TYPE_GUEST = 'guest';
    public static TYPE_USER = 'user';

    private _id : number;
    private _email : string;
    private _password : string;
    public DefaultTodoListId : number;

    public Setting : wu.model.data.ISetting;
    private _Profile : wu.model.data.IProfile;

    public usertype : string  = User.TYPE_GUEST;

    /**
     *
     * @param data
     */
    constructor(data?: wu.model.data.IUserData){
        super();
        if (_.isPlainObject(data)){
            this.fromJSON(data);
        }
    }

    /**
     *
     * @param data
     */
    public fromJSON(data: wu.model.data.IUserData) {
        const d = data || <wu.model.data.IUserData>{};

        this._id = d.id;
        this._email = d.email;
        this.DefaultTodoListId = d.DefaultTodoListId;
        this.Setting = new Setting(d.Setting);
        this._Profile = new Profile(d.Profile);

        if (this._id){
            this.usertype = User.TYPE_USER;
        }
    }

    @Json
    public get id():number {
        return this._id;
    }

    public set id(value:number) {
        console.warn('Read only');
    }
    @Dirty
    @Json
    public get email():string {
        return this._email;
    }

    public set email(value:string) {
        this._email = value;
    }

    @Dirty
    @Json
    public get password():string {
        return this._password;
    }

    public set password(value:string) {
        this._password = value;
    }

    @Json
    public get Profile() : wu.model.data.IProfile {
        return this._Profile;
    }

    public set Profile(value: wu.model.data.IProfile) {
        this._Profile = value;
    }
}
