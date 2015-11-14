import * as React from 'react';
import TodoList from './TodoList/TodoList';

export default class Todos extends React.Component<any, any> {

    constructor(props:any){
        super(props);
    }

    render() {
        const todolist = {
            Todos: [
                {id:1}
            ]
        } as wu.model.data.ITodoList;

        return <TodoList todolist={todolist}/>
    }
}
