import * as React from 'react';
import * as Rx from 'rx';
import * as _ from 'lodash';
import Todo from './Todo';
import ITodo = wu.model.data.ITodo;

export interface ITodoListProps extends __React.Props<ITodoListProps> {
    todolist: wu.model.data.ITodoList;
    showTodos?: VisibleTodos,
    onTodoChange?(todo: wu.model.data.ITodo);
    onTodoAdd?();
}

export class VisibleTodos {
    static All      = 'All';
    static Finished = 'Finished';
    static Open     = 'Open';
}

/**
 * @class TodoList
 * @namespace wu.components.TodoList
 */
export class TodoList extends React.Component<ITodoListProps, any> {

    todolist: wu.model.data.ITodoList;

    refs: any = {
        email   : HTMLInputElement,
        password: HTMLInputElement,
    };

    state: any = {};

    static defaultProps: ITodoListProps = {
        showTodos   : VisibleTodos.Open,
        todolist    : null,
        onTodoChange: () => {
        },
        onTodoAdd   : () => {
        }
    } as ITodoListProps;

    /**
     * Constructor
     * @param props
     */
    constructor(props: ITodoListProps) {
        super(props);
    }

    /**
     * React lifecycle
     * @param nextProps
     */
    shouldComponentUpdate(nextProps: ITodoListProps, nextState: any) {
        return nextProps.todolist !== this.props.todolist || nextProps.showTodos !== this.props.showTodos || _.isEqual(this.state, nextState);
    }

    render() {
        return (<div className="todolist">
            {this.createTodos()}
            <div className={`todo todo-add mdl-card mdl-shadow--2dp`} onClick={this.props.onTodoAdd}>
                <div className="todo__content">+</div>
            </div>
        </div>);
    }

    isTodoVisible(todo: ITodo): boolean {
        switch (true) {
            case this.props.showTodos === VisibleTodos.All:
            case todo.finished === false && this.props.showTodos === VisibleTodos.Open:
            case todo.finished === true && this.props.showTodos === VisibleTodos.Finished:
                return true;
            default:
                return false;
        }
    }

    createTodos() {
        if (this.props.todolist.Todos === undefined) {
            return null;
        }

        return this.props.todolist.Todos.valueSeq().filter((t: ITodo) => this.isTodoVisible(t)).map(this.createTodo.bind(this));
    }

    createTodo(todo: ITodo) {
        return <Todo todo={todo} key={todo.id} onTodoChange={this.props.onTodoChange.bind(this)}/>
    }
}
