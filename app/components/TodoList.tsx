import * as React from 'react';
import * as _ from 'lodash';
import * as TList from './TodoList/TodoList';
import AppState from '../models/state/AppStateModel';
import authService from '../services/AuthService';
import todoListService from '../services/TodoListService';
import {BaseError} from "../errors/BaseError";

export interface TodoListProps extends __React.Props<TodoListProps> {
    params: {
        id?: number
    },
    history: any;
}
/**
 *
 * Controller Component for a TodoList
 */
export default class TodoList extends React.Component<TodoListProps, any> {

    state: wu.model.state.ITodoStateModel;
    todoListLoadStream: Rx.IDisposable;

    constructor(props:any){
        super(props);

        this.state = AppState.todos;

        if (_.isNumber(this.props.params.id)) {
            this.createTodoListRequestStream(this.props.params.id);
        }
        else if (authService.currentUser) {
            this.props.history.pushState({id: authService.currentUser.DefaultTodoListId}, '/todolist');
        }
        else {
            console.log('No valid todolist id found');
        }
    }

    componentWillMount() {
        this.todoListLoadStream = this.state.changeStateStream.subscribe((state: wu.model.state.ITodoStateModel) => {
            this.setState(state);
        });
    }

    createTodoListRequestStream(id) {
        todoListService.getTodosRequestStream(Rx.Observable.just(id))
        .map((result: wu.model.data.ITodoList) => {
            if (result instanceof BaseError) {

            } else {
                this.state.todolist = result;
            }
        })
    }

    render() {
        const todolist = this.state.todolist;

        return <TList.TodoList todolist={todolist}/>
    }
}
