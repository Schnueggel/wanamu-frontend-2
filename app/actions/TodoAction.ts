import * as rx from 'rx';
import * as _ from 'lodash';
import todoListService from 'services/TodoListService';

interface ITodo extends wu.model.data.ITodo, Object {}

export class TodoAction {
    updateAndCreationCount:number = 0;

    updateFailedStream: Rx.Observable<Error>;
    updateStartStream: Rx.Subject<ITodo>;
    updateStream: Rx.Observable<ITodo>;
    updateSuccessStream: Rx.Observable<ITodo>;
    updateCounterStream:Rx.Subject<number>;

    constructor() {
        this.updateCounterStream = new Rx.Subject<number>();
        this.updateStartStream = new Rx.Subject<ITodo>();
        this.initUpdateStream();
    }

    initUpdateStream() {
        const obs = this.updateStartStream
            .do( x => this.updateCounterStream.onNext(this.updateAndCreationCount += 1))
            .filter((todo:any) => _.isObject(todo) && _.isNumber(todo.id))
            .buffer(this.updateStartStream.debounce(3000))
            .filter((todos:any) => todos.length > 0 )
            .map((buffer:ITodo[]) => {
                const tmp = _.map(_.groupBy(buffer, 'id'), (v:any) => _.last(v));
                this.updateAndCreationCount -= (buffer.length - tmp.length);
                return tmp;
            })
            .flatMap((todos:ITodo[]) => {
                return Rx.Observable.from(todos);
            });

        this.updateStream = todoListService
            .getUpdateTodoRequestStream(obs)
            .do( x => this.updateCounterStream.onNext(this.updateAndCreationCount -= 1))
            .publish().refCount();

        this.updateSuccessStream = this.updateStream
            .filter( (err: any) => err instanceof Error);

        this.updateFailedStream = this.updateStream
            .filter( todo => _.isObject(todo) && _.isNumber(todo.id)) as any;
    }

    updateTodo(todo:ITodo) {
        if (todo.dirty) {
            this.updateStartStream.onNext(todo);
        }
    }
}

export const todoAction = new TodoAction();
