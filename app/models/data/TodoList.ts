import _ = require('lodash');
import { Todo } from './Todo';
import { BaseModel }  from './BaseModel';

export class TodoList extends BaseModel implements wu.model.ITodoList {

    public id : number;
    public name : string;
    public Todos : Array<Todo> = [];

    protected highestOrderNumber : number = -1;

    /**
     *
     * @param data
     */
    constructor(data : wu.model.ITodoListData){
        super();
        this.fromJSON(data);
    }

    /**
     *
     * @param data
     */
    public fromJSON (data: wu.model.ITodoListData) : void {
        var data = data || <wu.model.ITodoListData>{};

        this.Todos = [];
        this.id = data.id;
        this.name = data.name;

        if (_.isArray(data.Todos)) {
            for(var i = 0; i < data.Todos.length; i++){
                this.addTodo(new Todo(data.Todos[i]));
            }
            this.sort();
        }
    }
    /**
     *
     * @param id
     * @returns {Todo}
     */
    public todo(id : number) : Todo {

        for(var i = 0; i < this.Todos.length; i++){
            if (this.Todos[i].id === id){
                return this.Todos[i];
            }
        }

        return null;
    }

    /**
     * Adds a Todo to the end of the TodoList
     * @param todo
     */
    public addTodo(todo : Todo) : void {
        if (todo instanceof Todo) {
            if (todo.order > this.highestOrderNumber) {
                this.highestOrderNumber = todo.order;
            }
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
            todo.order = this.highestOrderNumber = this.highestOrderNumber +1;
            todo.dirty = false;
            this.addTodo(todo);
            this.sort();
        }
    }

    /**
     * Returns todos sorted
     * @returns {Todo[]}
     */
    public todos() {
        this.sort();
        return this.Todos;
    }

    public sort = () : void => {
        this.Todos.sort(TodoList.compareOrder);
    };

    /**
     * Sorts Todo Objects by the order property. Order direction is desc
     * @param a
     * @param b
     * @returns {number}
     */
    public static compareOrder(a : Todo, b : Todo) {
        if (a.order < b.order) {
            return 1;
        }
        if (a.order > b.order) {
            return -1;
        }
        return 0;
    }
}
