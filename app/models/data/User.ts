import _ = require('lodash');
import { Setting } from 'models/data/Setting';
import { TodoList } from 'models/data/TodoList';
import { TodoListNotFoundError } from './errors/TodoListNotFoundError';
import { Todo } from 'models/data/Todo';
import { Profile } from 'models/data/Profile';
import { BaseModel }  from 'models/data/BaseModel';
import { Dirty, Json } from 'models/decorators/decorators';

export class User extends BaseModel implements wu.model.data.IUser {

    public static TYPE_GUEST = 'guest';
    public static TYPE_USER = 'user';

    private _id : number;
    private _email : string;
    private _password : string;
    public DefaultTodoListId : number;

    public TodoLists : Array<TodoList>;

    public defaulttodolist : TodoList;

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
     * @param d
     */
    public fromJSON(d: wu.model.data.IUserData) {
        let data = d || <wu.model.data.IUserData>{},
            todolist : TodoList;

        this._id = data.id;
        this._email = data.email;
        this.DefaultTodoListId = data.DefaultTodoListId;
        this.Setting = new Setting(data.Setting);
        this._Profile = new Profile(data.Profile);

        this.TodoLists = [];

        if (_.isArray(data.TodoLists)) {
            for (let i = 0; i < data.TodoLists.length; i++) {
                todolist = new TodoList(data.TodoLists[i]);
                if (todolist.id === this.DefaultTodoListId){
                    this.defaulttodolist = todolist;
                }
                this.TodoLists.push(todolist);
            }
        }

        if (this._id){
            this.usertype = User.TYPE_USER;
        }
    }
    /**
     *
     * @param id
     * @returns {TodoList|null}
     */
    public todolist (id : number) : TodoList {
        for(let i = 0; i < this.TodoLists.length; i++){
            if (this.TodoLists[i].id === id) {
                return this.TodoLists[i];
            }
        }

        return null;
    }

    /**
     *
     * @param id
     * @returns {TodoList}
     */
    public todo (id : number) {
        let todolist : TodoList;
        for(let i = 0; i < this.TodoLists.length; i++){
            todolist = this.TodoLists[i];

            for(let t = 0; t < todolist.Todos.length; t++){
                if (todolist.Todos[t].id === id){
                    return todolist.Todos[t];
                }
            }
        }
        return null;
    }

    /**
     * Adds a new TodoITem to the todolist. If no todolistId is given the default TodoList will be used.
     * If no TodoList could be found at all a TodoListNotFoundError will be thrown.
     * @param todo
     * @param [todolist]
     * @throws TodoListNotFoundError
     */
    public addNewTodo(todo : Todo, todolist?: TodoList) : void {
        if (todo instanceof Todo) {
            if (!(todolist instanceof TodoList) && this.defaulttodolist instanceof TodoList) {
                todolist = this.defaulttodolist;
            }
            if (!todolist) {
                throw new TodoListNotFoundError();
            }

            todolist.addNewTodo(todo);
        } else {
            console.warn('New Todo must be of type Todo');
        }
    }

    /**
     * Returns the todos from a
     * @param  {number} id TodoListId
     * @returns {Todo[]}
     * @throws TodoListNotFoundError
     */
    public todos(id?: number) : Todo[] {

        let todolist : TodoList = null;

        if (id) {
            todolist = this.todolist(id);
        }

        if (todolist === null) {
            todolist = this.defaulttodolist;
        }

        if (todolist instanceof TodoList) {
            return todolist.todos();
        } else {
            throw new TodoListNotFoundError();
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
