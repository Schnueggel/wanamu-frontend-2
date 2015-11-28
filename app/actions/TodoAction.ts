import * as rx from 'rx';
import todoListService from 'services/TodoListService';

export interface UpdateFailedResult {
    error: Error;
    todo: wu.model.data.ITodo
}

export class TodoAction {
    updateFailedStream: Rx.Subject<UpdateFailedResult>;
    updateSuccessStream: Rx.Subject<wu.model.data.ITodo>;

    constructor() {
        this.updateFailedStream = new Rx.Subject<UpdateFailedResult>();
        this.updateSuccessStream = new Rx.Subject<wu.model.data.ITodo>();
    }

    updateTodo(todo: wu.model.data.ITodo) {
        todoListService.getUpdateTodoRequestStream(Rx.Observable.just(todo))
        .subscribe((result: Error | wu.model.data.ITodoData) => {
            if (result instanceof Error) {
                const data: UpdateFailedResult = {
                    error: result as Error,
                    todo
                };
                this.updateFailedStream.onNext(data);
            } else {
                todo.fromJSON(result as wu.model.data.ITodoData);
                this.updateSuccessStream.onNext(todo);
            }
        });
    }
}

export const todoAction = new TodoAction();
