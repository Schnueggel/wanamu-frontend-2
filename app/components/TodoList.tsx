import * as React from 'react';
import * as _ from 'lodash';
import * as TList from 'components/TodoList/TodoList';
import authService from 'services/AuthService';
import {BaseError, NotFoundError} from 'errors/errors';
import {AppStateModel} from 'models/state/AppStateModel';
import * as ReactDOM from 'react-dom';
import * as Actions from 'actions/actions';

export interface TodoListProps extends __React.Props<TodoListProps> {
    params: {
        id?: string
    },
    history: any;
    appState: AppStateModel
}

/**
 *
 * Controller Component for a TodoList
 */
export default class TodoList extends React.Component<TodoListProps, any> {

    private id: number;

    refs: any = {
        todolist: TList.TodoList
    };

    constructor(props:TodoListProps) {
        super(props);
        this.convertId();
    }

    componentWillUpdate() {
        const id = this.id;
        this.convertId();
        if (this.id !== id) {
            Actions.todoListAction.getTodoList(this.id);
        }
    }

    componentWillMount() {
        Actions.todoListAction.getTodoList(this.id);
    }

    componentDidMount() {
        componentHandler.upgradeDom();

    }

    convertId() {
        if (_.isString(this.props.params.id)) {
            this.id = parseInt(this.props.params.id);
        }
    }

    handleTodoChange(todo: wu.model.data.ITodo) {
        Actions.todoAction.updateTodo(todo);
    }

    render() {
        const todolist = this.props.appState.todos.todolist || {} as any;

        if (todolist) {console.log(todolist);
            return <TList.TodoList todolist={todolist} onTodoChange={this.handleTodoChange.bind(this)} ref="todolist"/>
        }
    }
}
