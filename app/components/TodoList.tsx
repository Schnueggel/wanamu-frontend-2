import * as React from 'react';
import * as _ from 'lodash';
import * as TList from './TodoList/TodoList';
import authService from '../services/AuthService';
import todoListService from '../services/TodoListService';
import {BaseError} from "../errors/BaseError";
import {AppStateModel} from "../models/state/AppStateModel";

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

    constructor(props:TodoListProps) {
        super(props);
    }

    componentDidUpdate() {
        this.checkParamId();
    }

    componentWillMount() {
        this.checkParamId();
    }

    checkParamId() {
        if (this.props.params.id) {
            if (this.currentId !== this.props.params.id) {
                this.currentId = this.props.params.id;
                this.createTodoListRequestStream(this.props.params.id);
            }
        } else if (this.props.appState.login.user) {
            this.props.history.pushState(null, `/todolist/${this.props.appState.login.user.DefaultTodoListId}`);
        } else {
            this.props.history.pushState(null, '/login');
        }
    }

    createTodoListRequestStream(id) {
        todoListService.getTodosRequestStream(Rx.Observable.just(id))
            .subscribe((result:wu.model.data.ITodoList) => {
                if (result instanceof BaseError) {
                    console.log(result);
                } else {
                    this.props.appState.todos.todolist = result;
                }
            });
    }

    render() {
        const todolist = this.props.appState.todos.todolist || {} as any;

        return <TList.TodoList todolist={todolist}/>
    }
}
