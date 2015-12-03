import * as _ from 'lodash';
import * as Rx from 'rx';
import {BaseDataService} from 'services/BaseDataService';
import ITodoList = wu.model.data.ITodoList;
import * as Err from 'errors/errors';
import {TodoList} from 'models/data/TodoList';

export interface ITodoListResponse extends axios.Response {
    data: {data: Array<wu.model.data.ITodoListData>};
}

export interface ITodoResponse extends axios.Response {
    data: {
        data: Array<wu.model.data.ITodoData>
    };
}

/**
 *
 */
export class TodoListService extends BaseDataService {

    constructor() {
        super();
    }

    /**
     *
     * @param obs
     * @returns {any}
     */
     getTodosRequestStream(obs: Rx.Observable<number>) : Rx.Observable<ITodoList> {
        return obs
            .flatMapLatest((id:number) => this.axios.get(`http://localhost:3001/todolist/${id}`))
            .catch((e:Error) => {
                console.error(e);
                return Rx.Observable.just(new Err.UnknownError('An unknown error happened'));
            })
            .map((response: ITodoListResponse) => {
                if (response instanceof Err.BaseError) {
                    return response as any;
                } else if (_.get(response, 'data.data[0].id', false) === false){
                    return new Err.InvalidResponseDataError();
                } else {
                    return new TodoList(response.data.data[0]);
                }
            });
    }

    /**
     *
     * @param obs
     * @returns {Observable<BaseError|InvalidResponseDataError|wu.model.data.ITodoData>}
     */
    getUpdateTodoRequestStream(obs:Rx.Observable<wu.model.data.ITodo>): Rx.Observable<wu.model.data.ITodo> {
        return obs
            .flatMapLatest((todo:wu.model.data.ITodo) => {
                const promise = Rx.Observable.fromPromise(this.axios.put(`http://localhost:3001/todo/${todo.id}`, {
                    data: todo.toJSON()
                }));
                return Rx.Observable.combineLatest(Rx.Observable.just(todo), (promise), (a,b) => [a,b]);
            }).map(([todo, response]: [wu.model.data.ITodo, ITodoResponse]) => {
                if (response instanceof Err.BaseError) {
                    return response as any;
                } else if (_.get(response, 'data.success', false) === false || _.get(response, 'data.data[0].id', false) === false) {
                    return new Err.InvalidResponseDataError();
                } else {
                    todo.fromJSON(response.data.data[0]);
                    todo.dirty = false;
                    return todo;
                }
            });
    }
}

const todoListService = new TodoListService();

export default todoListService;