import * as React from 'react';
import * as _ from 'lodash';
import * as TList from 'components/TodoList/TodoList';
import * as Actions from 'actions/actions';
import { Todo } from 'models/data/Todo';
import { Select, IState as SelectIState } from 'components/Form/Select';
import { VisibleTodos } from 'components/TodoList/TodoList';

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

    constructor(props: ITodoListProps) {
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

        this.refs.todosVisible.stateStream.subscribe((state: SelectIState) =>
            this.setState({
                todoVisibilityState: state.value
            })
        );
    }

    convertId() {
        if (_.isString(this.props.params.id)) {
            this.id = parseInt(this.props.params.id);
        }
    }

    handleTodoChange(todo: wu.model.data.ITodo) {
        Actions.todoAction.doUpdate(todo);
    }

    handleCreateTodo() {
        let todo = new Todo();

        todo = todo.set('TodoListId', this.props.appState.todos.todolist.id);
        Actions.todoAction.doCreate(todo);
    }

    render() {
        const todolist = this.props.appState.todos.todolist || {} as any;

        if (todolist) {
            return (
                <div>
                    <div className="wu-actionbar">
                        <Select options={this.options} label="Select Todo" ref="todosVisible" value={VisibleTodos.Open}/>
                    </div>
                    <TList.TodoList todolist={todolist}
                                    onTodoChange={this.handleTodoChange.bind(this)}
                                    onTodoAdd={this.handleCreateTodo.bind(this)}
                                    ref="todolist"
                                    showTodos={this.state.todoVisibilityState}/>
                </div>)
        }
    }
}
