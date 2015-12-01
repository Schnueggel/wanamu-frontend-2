import * as Rx from 'rx';
import {BaseStateModel} from "models/state/BaseStateModel";
import {Notify} from 'models/decorators/NotifyDecorator';
import * as Actions from 'actions/actions';

export class TodosStateModel extends BaseStateModel<TodosStateModel> implements wu.model.state.ITodoStateModel {

    private _todolist: wu.model.data.ITodoList = null;
    private _isTodoUpdating: boolean = false;
    private _todoUpdateCount: number = 0;

    constructor() {
        super();
        Actions.todoAction.updateStream.subscribe(this.notify.bind(this));
        Actions.todoListAction.getSuccessStream.subscribe(this.onTodoListChanged.bind(this));
        Actions.todoAction.updateCounterStream.subscribe( v => this.todoUpdateCount = v);
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

    @Notify
    get todoUpdateCount():number {
        return this._todoUpdateCount;
    }

    set todoUpdateCount(value:number) {
        this._isTodoUpdating = value > 0;
        this._todoUpdateCount = value;
    }
}