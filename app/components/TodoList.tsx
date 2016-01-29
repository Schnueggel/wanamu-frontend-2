import * as React from 'react';
import * as _ from 'lodash';
import * as TList from 'components/TodoList/TodoList';
import { connect } from 'react-redux';
import { routeActions } from 'redux-simple-router';
import { bindActionCreators } from 'redux';
import { Select, IState as SelectIState } from 'components/Form/Select';
import { VisibleTodos } from '../constants';
import * as todolistActions from '../actions/TodoListAction';
import {Todo} from '../models/Todo';

/**
 *
 * Controller Component for a TodoList
 */
export class TodoList extends React.Component<wu.ITodoListProps, any> implements React.ComponentLifecycle<wu.ITodoListProps, any> {

    private id: number;

    state: any = {
        todoVisiblityState: VisibleTodos.All
    };

    refs: {
        [index:string]: any,
        todolist: TList.TodoList,
        todosVisible: Select
    };

    options: Array<{key: string, value:any}> = [
        {key: VisibleTodos.All, value: 'All'},
        {key: VisibleTodos.Open, value: 'Open'},
        {key: VisibleTodos.Finished, value: 'Finished'}
    ];

    constructor(props: wu.ITodoListProps) {
        super(props);
    }

    componentWillUpdate() {

    }

    componentWillMount() {
        if (!this.props.todolist.todolist && this.props.todolist.isLoading === false) {
            this.props.actions.todolist.todoListLoad(this.props.params.id);
        }
    }

    handleTodoChange(todo: wu.model.data.ITodo) {

    }

    handleCreateTodo() {
        //TODO implement
        let todo = new Todo();
    }

    render() {
        const todolist = this.props.todolist.todolist || {} as any;

        let error = null, todolistEl, loading;

        if (this.props.todolist.error) {
            error = <div className="error-message">{this.props.todolist.error}</div>
        }

        if (this.props.todolist.isLoading) {
            loading = <div className="loading">Loading</div>
        }

        if (todolist) {
            todolistEl = (
                <TList.TodoList todolist={todolist}
                                onTodoChange={this.handleTodoChange.bind(this)}
                                onTodoAdd={this.handleCreateTodo.bind(this)}
                                ref="todolist"
                                showTodos={this.state.todoVisibilityState}/>
            );
        }

        return (
            <div>
                <div className="wu-actionbar">
                    <Select options={this.options} label="Select Todo" ref="todosVisible" value={VisibleTodos.Open}/>
                </div>
                {error}
                {loading}
                {todolistEl}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        todolist: state.todolist
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            routeActions: bindActionCreators(routeActions, dispatch),
            todolist: bindActionCreators(todolistActions, dispatch)
        }
    }
}

const connected = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default connected;