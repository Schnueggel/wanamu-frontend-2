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
        this.checkParamId();
    }

    componentWillUpdate() {
        this.convertId();
        this.checkParamId();
    }

    componentDidMount() {
        componentHandler.upgradeDom();
    }

    convertId() {
        if (_.isString(this.props.params.id)) {
            this.id = parseInt(this.props.params.id);
        }
    }

    checkParamId() {
        if (this.id) {
            if (_.get(this.props.appState.todos.todolist, 'id') !== this.id) {
                Actions.todoListAction.getTodoList(this.id);
            }
        } else if (this.props.appState.login.user) {
            this.props.history.pushState(null, `/todolist/${this.props.appState.login.user.DefaultTodoListId}`);
        } else {
            this.props.history.pushState(null, '/login');
        }
    }

    handleTodoChange(todo: wu.model.data.ITodo) {
        Actions.todoAction.updateTodo(todo);
    }

    render() {
        const todolist = this.props.appState.todos.todolist || {} as any;

        return <TList.TodoList todolist={todolist} onTodoChange={this.handleTodoChange.bind(this)} ref="todolist"/>
    }
}
