import * as React from 'react';
import * as Rx from 'rx';
import Todo from './Todo';

export interface TodoListFormProps extends __React.Props<TodoListFormProps> {
    todolist: wu.model.data.ITodoList
}

export class TodoList extends React.Component<TodoListFormProps, any> {

    refs: any = {
        email: HTMLInputElement,
        password: HTMLInputElement,
    };

    state: any = {
    };

    constructor(props:TodoListFormProps){
        super(props);
    }

    render() {

        return  (<div className="todolist">
            {this.createTodos()}
        </div>);
    }

    createTodos() {
        if (this.props.todolist.Todos === undefined) {
            return null;
        }
        return this.props.todolist.Todos.map(this.createTodo);
    }

    createTodo(todo: wu.model.data.ITodo) {
        return <Todo todo={todo} key={todo.id}/>
    }
}
