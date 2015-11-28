import * as rx from 'rx';
import todoListService from 'services/TodoListService';

export interface GetFailedResult {
    error: Error;
    id: number
}

export class TodoListAction {
    getFailedStream: Rx.Subject<GetFailedResult>;
    getSuccessStream: Rx.Subject<wu.model.data.ITodoList>;

    constructor() {
        this.getFailedStream = new Rx.Subject<GetFailedResult>();
        this.getSuccessStream = new Rx.Subject<wu.model.data.ITodoList>();
    }

    getTodoList(id: number) {
        todoListService.getTodosRequestStream(Rx.Observable.just(id))
            .subscribe((result: any) => {
                if (result instanceof Error) {
                    const data: GetFailedResult = {
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
