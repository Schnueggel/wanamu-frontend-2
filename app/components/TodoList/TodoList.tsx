import * as React from 'react';
import * as Rx from 'rx';
import Todo from './Todo';

export interface TodoListFormProps extends __React.Props<TodoListFormProps> {
    todolist: wu.model.data.ITodoList;
    onTodoChange?(todo: wu.model.data.ITodo);
}

export class TodoList extends React.Component<TodoListFormProps, any> {

    refs: any = {
        email: HTMLInputElement,
        password: HTMLInputElement,
    };

    state: any = {};

    constructor(props:TodoListFormProps){
        super(props);

        if (_.isFunction(props.onTodoChange) === false) {
            props.onTodoChange = () => {};
        }
    }

    render() {
        return (<div className="todolist">
            {this.createTodos()}
        </div>);
    }

    createTodos() {
        if (this.props.todolist.Todos === undefined) {
            return null;
        }
        return this.props.todolist.Todos.map(this.createTodo.bind(this));
    }

    createTodo(todo: wu.model.data.ITodo) {
        return <Todo todo={todo} key={todo.id} onTodoChange={this.props.onTodoChange} />
    }
}
