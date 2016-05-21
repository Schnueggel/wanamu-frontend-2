import * as React from 'react';
import * as TList from 'components/TodoList/TodoList';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { Select } from 'components/Form/Select';
import { VisibleTodos } from '../constants';
import * as todolistActions from '../actions/TodoListAction';
import * as todoActions from '../actions/TodoActions';
import {Todo} from '../models/Todo';
import { Map } from 'immutable';
import ITodoView = wu.model.view.ITodoView;

/**
 *
 * Controller Component for a TodoList
 */
export class TodoList extends React.Component<wu.ITodoListProps, any> implements React.ComponentLifecycle<wu.ITodoListProps, any> {

    state: any = {
        todoVisibilityState: VisibleTodos.All
    };

    ctrls: {
        todolist?: TList.TodoList;
        todosVisible?: Select;
    } = {};

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
        this.checkTodolist(this.props);
    }

    componentWillUpdate(nextProps: wu.ITodoListProps, nextState: any, nextContext: any) {
        this.checkTodolist(nextProps);
    }

    checkTodolist(props) {
        if (props.params.id === undefined) {
            props.actions.routerActions.push(`/todolist/${props.user.user.defaultTodolistId}`);
        } else if (props.todolist.isLoading === false && typeof props.todolist.id !== 'string') {
            props.actions.todolist.todoListLoad(props.params.id);
        }
    }

    handleTodoChange(todo: ITodoView) {
        this.props.actions.todo.todoDoUpdate(todo);
    }

    handleTodoCreate() {
        let todo: ITodoView = new Todo();
        todo.todolistId = this.props.user.user.defaultTodolistId;
        this.props.actions.todo.todoDoCreate(todo);
    }

    handleTodoDelete(todo: ITodoView) {
        this.props.actions.todo.todoDoDelete(todo);
    }

    handleTodoFinish(todo: ITodoView) {
        this.props.actions.todo.todoDoFinish(todo);
    }

    handleVisibilityFilter({value}) {
        this.props.actions.todolist.todoListVisibility(value);
    }

    getVisibleTodos() {
        const visible = this.props.todolist.visibility;

        return this.props.todolist.todos.toArray().filter(todo => {
            if ((visible === VisibleTodos.Open || visible === VisibleTodos.All) && todo.finished === false) {
                return true;
            } else if ((visible === VisibleTodos.Finished || visible === VisibleTodos.All) && todo.finished === true) {
                return true
            }
            return false;
        })
    }

    render() {
        const todos = this.getVisibleTodos();

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
                                onTodoViewChange={this.props.actions.todo.todoViewChange}
                                ref={ c => this.ctrls.todolist }
                                showTodos={this.state.todoVisibilityState}/>
            );
        }

        return (
            <div className="todolist__container">
                <div className="actionbar">
                    <Select options={this.options} label="Select Todo" ref={ c => this.ctrls.todosVisible } value={this.props.todolist.visibility} onChange={this.handleVisibilityFilter.bind(this)}/>
                </div>
                {error}
                {loading}
                {todolistEl}
            </div>
        );
    }
}

function mapStateToProps(state: wu.IState): any {
    return {
        todolist: state.todolist,
        user: state.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            routerActions: bindActionCreators(routerActions as any, dispatch),
            todolist: bindActionCreators(todolistActions as any, dispatch),
            todo: bindActionCreators(todoActions as any, dispatch)
        }
    };
}

const connected = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default connected;
