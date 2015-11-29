import * as rx from 'rx';
import * as _ from 'lodash';
import todoListService from 'services/TodoListService';

export class TodoAction {
    updateAndCreationCount:number = 0;
    updateFailedStream:Rx.Subject<Error>;
    updateSuccessStream:Rx.Observable<wu.model.data.ITodo>;
    updateCounterStream:Rx.Subject<number>;

    private updateObserver: Rx.Observer<any>;

    constructor() {
        this.updateFailedStream = new Rx.Subject<Error>();
        this.updateCounterStream = new Rx.Subject<number>();
        this.initUpdateStream();
    }

    initUpdateStream() {
        const obs: Rx.Observable<wu.model.data.ITodo> = Rx.Observable.create<wu.model.data.ITodo>((observer: Rx.Observer<wu.model.data.ITodo>) => {
            this.updateObserver = observer;
        })
        .buffer( ()=> Rx.Observable.timer(5000))
        .map((buffer:any) => {
            return buffer.filter((v:any) => v !== undefined);
        })
        .flatMap((buffer: any) => {
            if (buffer.length === 0) {
                return Rx.Observable.from([]);
            } else {
                return Rx.Observable.just(buffer);
            }
        })
        .map((buffer:any) => {
            const tmp = _.map(_.groupBy(buffer,'id'), (v: any) => _.last(v));
            this.updateAndCreationCount -= (buffer.length - tmp.length);
            return tmp;
        })
        .flatMap((todos: any) => {
            return Rx.Observable.from(_.values(todos));
        });

        this.updateSuccessStream = todoListService.getUpdateTodoRequestStream(obs).publish().refCount();

        this.updateSuccessStream.subscribe((result:Error | wu.model.data.ITodoData) => {
            this.updateAndCreationCount -= 1;
            this.updateCounterStream.onNext(this.updateAndCreationCount);
            if (result instanceof Error) {
                this.updateFailedStream.onNext(result as Error);
            } else {
                this.updateObserver.onNext(result as wu.model.data.ITodo);
            }
        });
    }

    updateTodo(todo:wu.model.data.ITodo) {
        if (todo.dirty) {
            this.updateAndCreationCount += 1;
            this.updateCounterStream.onNext(this.updateAndCreationCount);
            this.updateObserver.onNext(todo);
        }
    }
}

export const todoAction = new TodoAction();
