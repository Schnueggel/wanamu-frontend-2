import * as rx from 'rx';
import * as _ from 'lodash';
import todoListService from 'services/TodoListService';

interface ITodo extends wu.model.data.ITodo, Object {}

export class TodoAction {
    updateAndCreationCount:number = 0;
    updateFailedStream:Rx.Subject<Error>;
    updateStartStream: Rx.Subject<ITodo>;
    updateStream:Rx.Observable<ITodo>;
    updateCounterStream:Rx.Subject<number>;

    constructor() {
        this.updateFailedStream = new Rx.Subject<Error>();
        this.updateCounterStream = new Rx.Subject<number>();
        this.updateStartStream = new Rx.Subject<ITodo>();
        this.initUpdateStream();
    }

    initUpdateStream() {
        const obs = this.updateStartStream
            .filter((todo:any) => todo && todo.id)
            .buffer(this.updateStartStream.debounce(3000))
            .filter((todos:any) => todos.length > 0 )
            .map((buffer:ITodo[]) => {
                const tmp = _.map(_.groupBy(buffer, 'id'), (v:any) => _.last(v));
                this.updateAndCreationCount -= (buffer.length - tmp.length);
                return tmp;
            })
            .flatMap((todos:ITodo[]) => {console.log(todos);
                return Rx.Observable.from(todos);
            });

        this.updateStream = todoListService.getUpdateTodoRequestStream(obs).publish().refCount();

        this.updateStream.subscribe((result:Error | wu.model.data.ITodoData) => {
            this.updateAndCreationCount -= 1;
            this.updateCounterStream.onNext(this.updateAndCreationCount);
            if (result instanceof Error) {
                this.updateFailedStream.onNext(result as Error);
            } else {
                this.updateStartStream.onNext(result as ITodo);
            }
        });
    }

    updateTodo(todo:ITodo) {console.time('update');
        if (todo.dirty) {
            this.updateAndCreationCount += 1;
            this.updateCounterStream.onNext(this.updateAndCreationCount);
            this.updateStartStream.onNext(todo);
        }
    }
}

export const todoAction = new TodoAction();
