import * as React from 'react';
import * as _ from 'lodash';
import * as TList from 'components/TodoList/TodoList';
import authService from 'services/AuthService';
import {BaseError} from 'errors/BaseError';
import {AppStateModel} from 'models/state/AppStateModel';
import * as ReactDOM from 'react-dom';
import * as Actions from 'actions/actions';

export interface TodoListProps extends __React.Props<TodoListProps> {
    params: {
        id?: number
    },
    history: any;
    appState: AppStateModel
}

/**
 *
 * Controller Component for a TodoList
 */
export default class TodoList extends React.Component<TodoListProps, any> {

    private currentId: number = null;

    refs: any = {
        todolist: TList.TodoList
    };

    constructor(props:TodoListProps) {
        super(props);
    }

    componentDidUpdate() {
        this.checkParamId();
    }

    componentWillMount() {
        this.checkParamId();
    }

    componentDidMount() {
        componentHandler.upgradeDom();
    }

    checkParamId() {
        if (this.props.params.id) {
            if (this.currentId !== this.props.params.id) {
                this.currentId = this.props.params.id;
                Actions.todoListAction.getTodoList(this.props.params.id);
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
