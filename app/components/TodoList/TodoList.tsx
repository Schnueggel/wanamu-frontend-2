import * as React from 'react';
import * as _ from 'lodash';
import Todo from './Todo';
import ITodo = wu.model.data.ITodo;
import ITodoView = wu.model.view.ITodoView;

export interface ITodoListProps extends __React.Props<ITodoListProps> {
    todos: wu.model.data.ITodo[];
    showTodos?: VisibleTodos,
    onTodoChange?(todo: wu.model.view.ITodoView);
    onTodoDelete?(todo: wu.model.view.ITodoView);
    onTodoFinish?(todo: wu.model.view.ITodoView);
    onTodoViewChange?(todo: wu.model.view.ITodoView);
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
export class TodoList extends React.Component<ITodoListProps, any> implements React.ComponentLifecycle<ITodoListProps, any> {
    
    static defaultProps: ITodoListProps = {
        showTodos   : VisibleTodos.Open,
        todos    : null,
        onTodoChange: () => {},
        onTodoAdd   : () => {},
        onTodoDelete: () => {},
        onTodoViewChange: () => {}
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
     * @param nextState
     */
    shouldComponentUpdate(nextProps: ITodoListProps, nextState: any) {
        return nextProps.todos !== this.props.todos || nextProps.showTodos !== this.props.showTodos;
    }

    /**
     *
     * @returns {any}
     */
    render() {
        return (<div className="todolist">
            {this.createTodos()}
            <div className={`todo todo-add`} onClick={this.props.onTodoAdd}>
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
        if (Array.isArray(this.props.todos) === false) {
            return null;
        }

        return this.props.todos.filter((t: ITodo) => this.isTodoVisible(t)).map(this.createTodo.bind(this));
    }

    createTodo(todo: ITodoView) {
        return <Todo todo={todo} key={todo._id} onTodoChange={this.props.onTodoChange} onTodoDelete={this.props.onTodoDelete} onTodoFinish={this.props.onTodoFinish} onTodoViewChange={this.props.onTodoViewChange}/>
    }
}
