import * as React from 'react';
import * as _ from 'lodash';
import * as TList from 'components/TodoList/TodoList';
import * as Actions from 'actions/actions';

export interface ITodoListProps extends wu.IControlProps<ITodoListProps> {
    params: {
        id?: string
    }
}

/**
 *
 * Controller Component for a TodoList
 */
export default class TodoList extends React.Component<ITodoListProps, any> {

    private id: number;

    refs: any = {
        todolist: TList.TodoList
    };

    constructor(props:ITodoListProps) {
        super(props);
        this.convertId();
    }

    componentWillUpdate() {
        const id = this.id;
        this.convertId();
        if (this.id !== id) {
            Actions.todoListAction.doGetTodoList(this.id);
        }
    }

    componentWillMount() {
        Actions.todoListAction.doGetTodoList(this.id);
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
        Actions.todoAction.doUpdate(todo);
    }

    render() {
        const todolist = this.props.appState.todos.todolist || {} as any;
console.log(this.props.appState.todos.todolist);
        if (todolist) {
            return <TList.TodoList todolist={todolist} onTodoChange={this.handleTodoChange.bind(this)} ref="todolist"/>
        }
    }
}
