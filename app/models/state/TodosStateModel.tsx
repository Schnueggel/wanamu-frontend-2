import * as Rx from 'rx';
import {BaseStateModel} from "models/state/BaseStateModel";
import {Notify} from 'models/decorators/NotifyDecorator';
import {NotFoundError} from 'errors/errors';
import * as Actions from 'actions/actions';

export class TodosStateModel extends BaseStateModel<TodosStateModel> implements wu.model.state.ITodoStateModel {

    private _todolist: wu.model.data.ITodoList = null;
    private _isTodoUpdating: boolean = false;
    private _todoUpdateCount: number = 0;
    private _todoListNotFound: boolean = false;
    private _isTodoListLoading: boolean = false;

    constructor() {
        super();
        Actions.todoAction.updateStream.subscribe(this.notify.bind(this));
        Actions.todoAction.updateCounterStream.subscribe( v => this.todoUpdateCount = v);
        Actions.todoAction.updateSuccessStream.subscribe( (v: wu.model.data.ITodo) => {
            if (this.todolist.getIn(['Todos', v.id.toString()])) {
                this.todolist = this.todolist.setIn(['Todos', v.id.toString()], v) as wu.model.data.ITodoList;
            }
        });

        Actions.todoListAction.getTodoListErrorStream.subscribe((error) => {
            if (error instanceof NotFoundError) {
               this.todoListNotFound = true;
            }
        });

        Actions.todoListAction.getTodoListSuccessStream.subscribe((todoList: wu.model.data.ITodoList) => {
            this.todoListNotFound = false;
            this.todolist = todoList;
        });

        Actions.todoListAction.getTodoListStartStream.subscribe(() => {
            this.isTodoListLoading = true;
        });

        Actions.todoListAction.getTodoListStream.subscribe((r) => {
            this.isTodoListLoading = false;
        });
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

    @Notify
    get todoListNotFound():boolean {
        return this._todoListNotFound;
    }

    set todoListNotFound(value:boolean) {
        this._todoListNotFound = value;
    }

    @Notify
    get isTodoListLoading():boolean {
        return this._isTodoListLoading;
    }

    set isTodoListLoading(value:boolean) {
        this._isTodoListLoading = value;
    }
}