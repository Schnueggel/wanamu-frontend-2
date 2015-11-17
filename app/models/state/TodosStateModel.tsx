import * as Rx from 'rx';
import {BaseStateModel} from "./BaseStateModel";
import {Notify} from './decorators/NotifyDecorator';

export class TodosStateModel extends BaseStateModel<TodosStateModel> implements wu.model.state.ITodoStateModel {

    private _todolist: wu.model.data.ITodoList = null;

    constructor() {
       super();
    }

    get todolist(): wu.model.data.ITodoList {
        return this._todolist;
    }

    @Notify
    set todolist(value: wu.model.data.ITodoList) {
        this._todolist = value;
    }

}import _ = require('lodash');
