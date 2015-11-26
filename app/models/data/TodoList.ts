import _ = require('lodash');
import { Todo } from 'models/data/Todo';
import { BaseModel }  from 'models/data/BaseModel';

export class TodoList extends BaseModel<TodoList> implements wu.model.data.ITodoList {
    public id : number;
    public name : string;
    public Todos : Array<Todo> = [];

    private _todoChangeStream : Rx.Subject<wu.model.data.ITodo>;

    /**
     *
     * @param data
     */
    constructor(data : wu.model.data.ITodoListData){
        super();
        this.fromJSON(data);
        this.todoChangeStream = new Rx.Subject<wu.model.data.ITodo>();
    }

    /**
     *
     * @param data
     */
    public fromJSON (data: wu.model.data.ITodoListData) : void {
        const d = data || <wu.model.data.ITodoListData>{};

        this.Todos = [];
        this.id = d.id;
        this.name = d.name;

        if (_.isArray(d.Todos)) {
            d.Todos.forEach((todoData: wu.model.data.ITodoData)=> {
                this.addTodo(new Todo(todoData));
            });
        }
    }

    /**
     *
     * @param id
     * @returns {Todo}
     */
    public todo(id : number) : Todo {
        return _.find(this.Todos, {id});
    }

    /**
     * Adds a Todo to the end of the TodoList
     * @param todo
     */
    private addTodo(todo : Todo) : void {
        if (todo instanceof Todo) {
            // Any change of a Todo model will also trigger the change stream of this TodoList
            todo.changeDataStream.subscribe(() => {
                this.todoChangeStream.onNext(todo);
            });
            this.Todos.push(todo);
        }
    }

    /**
     * This adds a new Todo and automatically gives it the highest order number possible adding it to the beginning of
     * the TodoList if sorted Desc
     * @param todo
     */
    public addNewTodo(todo : Todo) : void {
        if (todo instanceof Todo){
            todo.TodoListId = this.id;
            todo.dirty = false;
            this.addTodo(todo);
        }
    }

    get todoChangeStream():Rx.Subject<wu.model.data.ITodo> {
        return this._todoChangeStream;
    }

    set todoChangeStream(value:Rx.Subject<wu.model.data.ITodo>) {
        this._todoChangeStream = value;
    }

}
