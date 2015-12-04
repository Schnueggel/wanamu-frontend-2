import {Observable, Subject} from 'rx';
import todoListService from 'services/TodoListService';
import * as _ from 'lodash';

/**
 * @class TodoListAction
 * @namespace wu.actions
 */
export class TodoListAction {
    getTodoListErrorStream: Observable<Error>;
    getTodoListSuccessStream: Observable<wu.model.data.ITodoList>;
    getTodoListStream: Observable<wu.model.data.ITodoList|Error>;
    getTodoListStartStream: Subject<number>;

    /**
     * TodoListAction
     */
    constructor() {
        this.getTodoListStartStream = new Subject<number>();
        this.getTodoListStream = todoListService.getTodosRequestStream(this.getTodoListStartStream)
            .publish()
            .refCount();

        this.getTodoListErrorStream = this.getTodoListStream
            .filter(x => x instanceof Error) as Observable<Error>;

        this.getTodoListSuccessStream = this.getTodoListStream
            .filter( (x:any) => _.isObject(x) && _.isNumber(x.id)) as Observable<wu.model.data.ITodoList>;
    }

    /**
     * Query the todolist
     * @param id
     */
    doGetTodoList(id: number) {
        this.getTodoListStartStream.onNext(id);
    }
}

export var todoListAction = new TodoListAction();
