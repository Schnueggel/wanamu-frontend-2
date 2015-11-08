import * as React from 'react';
import * as Rx from 'rx';
import Todo from './Todo';

export interface TodoListFormProps extends __React.Props<TodoListFormProps> {
    todolist: wu.model.ITodoList
}


export default class TodoList extends React.Component<TodoListFormProps, any> {

    refs: any = {
        email: HTMLInputElement,
        password: HTMLInputElement,
    };

    state:any = {
    };

    constructor(props:TodoListFormProps){
        super(props);
    }

    render() {

        return  <ul>
            {this.createTodos()}
        </ul>
    }

    createTodos() {
        return this.props.todolist.Todos.map(this.createTodo);
    }

    createTodo(todo: wu.model.ITodo) {
        return <Todo todo={todo}/>
    }
}
