import * as React from 'react';
import * as TList from 'components/TodoList/TodoList';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { Select } from 'components/Form/Select';
import { VisibleTodos } from '../constants';
import * as todolistActions from '../actions/TodoListAction';
import * as todoActions from '../actions/TodoActions';
import {Todo} from '../models/Todo';
import { Map } from 'immutable';

/**
 *
 * Controller Component for a TodoList
 */
export class TodoList extends React.Component<wu.ITodoListProps, any> implements React.ComponentLifecycle<wu.ITodoListProps, any> {

    state: any = {
        todoVisibilityState: VisibleTodos.All
    };

    refs: {
        [index:string]: any,
        todolist: TList.TodoList,
        todosVisible: Select
    };

    static defaultProps:any = {
        todos: Map(),
    };

    options: Array<{key: string, value:any}> = [
        {key: VisibleTodos.All, value: 'All'},
        {key: VisibleTodos.Open, value: 'Open'},
        {key: VisibleTodos.Finished, value: 'Finished'}
    ];

    constructor(props: wu.ITodoListProps) {
        super(props);
    }

    componentWillMount() {
        if (this.props.todolist.isLoading === false) {
            this.props.actions.todolist.todoListLoad(this.props.params.id);
        }
    }

    handleTodoChange(todo: wu.model.data.ITodo) {
        this.props.actions.todo.todoDoUpdate(todo);
    }

    handleTodoCreate() {
        let todo: wu.model.data.ITodo = new Todo();
        todo.todolistId = this.props.params.id;
        this.props.actions.todo.todoDoCreate(todo);
    }

    handleTodoDelete(todo: wu.model.data.ITodo){
        this.props.actions.todo.todoDoDelete(todo);
    }

    handleTodoFinish(todo: wu.model.data.ITodo) {
        this.props.actions.todo.todoDoFinish(todo);
    }

    handleVisibilityFilter({value}) {
        this.props.actions.todolist.todoListVisibility(value);
    }

    render() {
        const visible = this.props.todolist.visibility;

        const todos = this.props.todolist.todos.toArray().filter(todo => {
            if ((visible === VisibleTodos.Open || visible === VisibleTodos.All) && todo.finished === false) {
                return true;
            } else if ((visible === VisibleTodos.Finished || visible === VisibleTodos.All) && todo.finished === true) {
                return true
            }
            return false;
        });

        let error = null, todolistEl, loading;

        if (this.props.todolist.error) {
            error = <div className="error-message">{this.props.todolist.error}</div>
        }

        if (this.props.todolist.isLoading) {
            loading = <div className="loading">Loading</div>
        }

        if (todos) {
            todolistEl = (
                <TList.TodoList todos={todos}
                                onTodoChange={this.handleTodoChange.bind(this)}
                                onTodoAdd={this.handleTodoCreate.bind(this)}
                                onTodoDelete={this.handleTodoDelete.bind(this)}
                                onTodoFinish={this.handleTodoFinish.bind(this)}
                                ref="todolist"
                                showTodos={this.state.todoVisibilityState}/>
            );
        }

        return (
            <div>
                <div className="wu-actionbar">
                    <Select options={this.options} label="Select Todo" ref="todosVisible" value={this.props.todolist.visibility} onChange={this.handleVisibilityFilter.bind(this)}/>
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
            todolist: bindActionCreators(todolistActions, dispatch),
            todo: bindActionCreators(todoActions, dispatch)
        }
    }
}

const connected = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default connected;
