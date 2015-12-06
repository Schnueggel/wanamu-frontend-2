import {Observable, Subject} from 'rx';
import * as _ from 'lodash';
import todoListService from 'services/TodoListService';

import ITodo = wu.model.data.ITodo;
/**
 * @class TodoAction
 * @namespace wu.actions
 */
export class TodoAction {
    updateAndCreationCount: number = 0;

    updateErrorStream: Observable<Error>;
    updateStream: Observable<ITodo|Error>;
    updateSuccessStream: Observable<ITodo>;
    updateCounterStream: Subject<number>;
    updateStartStream: Subject<ITodo>;

    /**
     * TodoAction
     */
    constructor() {
        this.updateCounterStream = new Subject<number>();
        this.updateStartStream   = new Subject<ITodo>();
        this.initUpdateStream();
    }

    /**
     * Creates all streams
     */
    initUpdateStream() {
        const obs = this.updateStartStream
            .do(x => this.updateCounterStream.onNext(this.updateAndCreationCount += 1))
            .filter((todo: any) => _.isObject(todo) && _.isNumber(todo.id))
            .buffer(this.updateStartStream.debounce(3000))
            .filter((todos: any) => todos.length > 0)
            .map((buffer: ITodo[]) => {
                //TODO Still try to find a working stream for this
                const tmp = _.map(_.groupBy(buffer, 'id'), (v: any) => _.last(v));
                this.updateAndCreationCount -= (buffer.length - tmp.length);
                return tmp;
            })
            .flatMap((todos: ITodo[]) => {
                return Observable.from(todos);
            });

        this.updateStream = todoListService
            .getUpdateTodoRequestStream(obs)
            .do(x => this.updateCounterStream.onNext(this.updateAndCreationCount -= 1))
            .publish()
            .refCount();

        this.updateErrorStream = this.updateStream
            .filter((err: any) => err instanceof Error) as Observable<Error>;

        this.updateSuccessStream = this.updateStream
            .filter((todo: any) => _.isObject(todo) && _.isNumber(todo.id)) as Observable<ITodo>;
    }

    /**
     * Update action
     * @param todo
     */
    doUpdate(todo: ITodo) {
        this.updateStartStream.onNext(todo);
    }
}

export const todoAction = new TodoAction();
