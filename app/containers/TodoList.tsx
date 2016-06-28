import * as React from 'react';
import * as TList from 'components/TodoList/TodoList';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { Select } from 'components/Form/Select';
import { VisibleTodos, VisibleTodosValues } from '../constants';
import * as todolistActions from '../actions/TodoListAction';
import * as todoActions from '../actions/TodoActions';
import { Todo } from '../models/Todo';
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
        todos: Map()
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
            const location = Object.assign({}, props.location, {pathname: `/todolist/${props.user.user.defaultTodolistId}`});
            props.actions.routerActions.push(location);
        } else if (props.todolist.isLoading === false && typeof props.todolist.id !== 'string') {
            props.actions.todolist.todoListRequest(props.params.id);
        }
    }

    handleTodoChange(todo: ITodoView) {
        this.props.actions.todo.todoUpdateRequest(todo);
    }

    handleTodoCreate() {
        let todo: ITodoView = new Todo();
        todo.todolistId = this.props.user.user.defaultTodolistId;
        this.props.actions.todo.todoCreateRequest(todo);
    }

    handleTodoDelete(todo: ITodoView) {
        this.props.actions.todo.todoDeleteRequest(todo);
    }

    handleTodoFinish(todo: ITodoView) {
        this.props.actions.todo.todoFinishRequest(todo);
    }

    handleVisibilityFilter({value}) {
        const location = Object.assign({}, this.props.location, {query: {visible: value}}) as any;
        this.props.actions.routerActions.push(location);
    }

    getVisibleTodos() {
        const visible = this.getVisibleValue();
        return this.props.todolist.todos.toArray().filter(todo => {
            if ((visible === VisibleTodos.Open || visible === VisibleTodos.All) && todo.finished === false) {
                return true;
            } else if ((visible === VisibleTodos.Finished || visible === VisibleTodos.All) && todo.finished === true) {
                return true
            }
            return false;
        })
    }

    getVisibleValue() {
        if (VisibleTodosValues.indexOf(this.props.location.query['visible']) > -1) {
            return this.props.location.query['visible'];
        }

        return VisibleTodos.Open;
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
                                ref={ c => this.ctrls.todolist }/>
            );
        }

        return (
            <div className="todolist__container">
                <div className="actionbar">
                    <Select options={this.options} label="Select Todo" ref={ c => this.ctrls.todosVisible = c} value={this.getVisibleValue()} onChange={this.handleVisibilityFilter.bind(this)}/>
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
