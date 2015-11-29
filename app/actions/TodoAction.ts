import * as rx from 'rx';
import * as _ from 'lodash';
import todoListService from 'services/TodoListService';

interface ITodo extends wu.model.data.ITodo, Object {};

export class TodoAction {
    updateAndCreationCount:number = 0;
    updateFailedStream:Rx.Subject<Error>;
    updateSuccessStream:Rx.Observable<wu.model.data.ITodo>;
    updateCounterStream:Rx.Subject<number>;

    private updateObserver: Rx.Observer<wu.model.data.ITodo>;

    constructor() {
        this.updateFailedStream = new Rx.Subject<Error>();
        this.updateCounterStream = new Rx.Subject<number>();
        this.initUpdateStream();
    }

    initUpdateStream() {
        const obs: Rx.Observable<ITodo> = Rx.Observable.create<ITodo>((observer: Rx.Observer<ITodo>) => {
            this.updateObserver = observer;
        })
        .buffer( ()=> Rx.Observable.timer(5000))
        .map((buffer:ITodo[]) => {
            return buffer.filter((v:any) => v !== undefined);
        })
        .flatMap((buffer: ITodo[]) => {
            if (buffer.length === 0) {
                return Rx.Observable.from([]);
            } else {
                return Rx.Observable.just(buffer);
            }
        })
        .map((buffer: ITodo[]) => {
            const tmp = _.map(_.groupBy(buffer,'id'), (v: any) => _.last(v));
            this.updateAndCreationCount -= (buffer.length - tmp.length);
            return tmp;
        })
        .flatMap<ITodo>((todos: ITodo[]) => {
            return Rx.Observable.from<ITodo>(_.values<ITodo>(todos) as ITodo[]);
        });

        this.updateSuccessStream = todoListService.getUpdateTodoRequestStream(obs).publish().refCount();

        this.updateSuccessStream.subscribe((result:Error | wu.model.data.ITodoData) => {
            this.updateAndCreationCount -= 1;
            this.updateCounterStream.onNext(this.updateAndCreationCount);
            if (result instanceof Error) {
                this.updateFailedStream.onNext(result as Error);
            } else {
                this.updateObserver.onNext(result as ITodo);
            }
        });
    }

    updateTodo(todo: ITodo) {
        if (todo.dirty) {
            this.updateAndCreationCount += 1;
            this.updateCounterStream.onNext(this.updateAndCreationCount);
            this.updateObserver.onNext(todo);
        }
    }
}

export const todoAction = new TodoAction();
