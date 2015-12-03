import * as rx from 'rx';
import todoListService from 'services/TodoListService';

export interface IFailedTodoRequestResult {
    error: Error;
    id: number
}

export class TodoListAction {
    getFailedStream: Rx.Subject<IFailedTodoRequestResult>;
    getSuccessStream: Rx.Subject<wu.model.data.ITodoList>;

    constructor() {
        this.getFailedStream = new Rx.Subject<IFailedTodoRequestResult>();
        this.getSuccessStream = new Rx.Subject<wu.model.data.ITodoList>();
    }

    getTodoList(id: number) {
        todoListService.getTodosRequestStream(Rx.Observable.just(id))
            .subscribe((result: any) => {
                if (result instanceof Error) {
                    const data: IFailedTodoRequestResult = {
                        error: result,
                        id
                    };
                    this.getFailedStream.onNext(data);
                } else {
                    this.getSuccessStream.onNext(result);
                }
            });
    }
}

export var todoListAction = new TodoListAction();
