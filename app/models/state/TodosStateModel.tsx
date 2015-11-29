import * as Rx from 'rx';
import {BaseStateModel} from "models/state/BaseStateModel";
import {Notify} from 'models/decorators/NotifyDecorator';
import * as Actions from 'actions/actions';

export class TodosStateModel extends BaseStateModel<TodosStateModel> implements wu.model.state.ITodoStateModel {

    private _todolist: wu.model.data.ITodoList = null;
    private _isTodoUpdating: boolean = false;

    constructor() {
        super();
        Actions.todoAction.updateSuccessStream.subscribe(this.notify.bind(this));
        Actions.todoListAction.getSuccessStream.subscribe(this.onTodoListChanged.bind(this));
        Actions.todoAction.updateCounterStream.subscribe(this.onUpdateAndCreateCountChanged.bind(this));
    }

    onUpdateAndCreateCountChanged(count: number) {
        this.isTodoUpdating = count > 0;
    }

    onTodoListChanged(todoList: wu.model.data.ITodoList) {
        this.todolist = todoList;
    }

    @Notify
    get todolist(): wu.model.data.ITodoList {
        return this._todolist;
    }

    set todolist(value: wu.model.data.ITodoList) {
        this._todolist = value;
    }

    @Notify
    get isTodoUpdating():boolean {
        return this._isTodoUpdating;
    }

    set isTodoUpdating(value:boolean) {
        this._isTodoUpdating = value;
    }
}