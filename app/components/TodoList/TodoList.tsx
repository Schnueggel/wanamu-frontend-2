import * as React from 'react';
import * as Rx from 'rx';
import Todo from './Todo';

export interface ITodoListProps extends __React.Props<ITodoListProps> {
    todolist: wu.model.data.ITodoList;
    onTodoChange?(todo: wu.model.data.ITodo);
}

/**
 * @class TodoList
 * @namespace wu.components.TodoList
 */
export class TodoList extends React.Component<ITodoListProps, any> {

    todolist: wu.model.data.ITodoList;

    refs: any = {
        email: HTMLInputElement,
        password: HTMLInputElement,
    };

    state: any = {};

    /**
     * Constructor
     * @param props
     */
    constructor(props:ITodoListProps){
        super(props);

        this.todolist = props.todolist;

        if (_.isFunction(props.onTodoChange) === false) {
            props.onTodoChange = () => {};
        }
    }


    /**
     * React lifecycle
     * @param nextProps
     */
    componentWillUpdate(nextProps: ITodoListProps) {
        this.todolist = nextProps.todolist;
    }

    /**
     * React lifecycle
     * @param nextProps
     */
    shouldComponentUpdate(nextProps: ITodoListProps, nextState: any) {
        return nextProps.todolist !== this.todolist || this.state !== nextState;
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
