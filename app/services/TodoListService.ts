import * as _ from 'lodash';
import * as Rx from 'rx';
import {BaseDataService} from 'services/BaseDataService';
import ITodoList = wu.model.data.ITodoList;
import * as Err from 'errors/errors';
import * as Immutable from 'immutable';
import { Todo } from 'models/data/Todo';
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
 * @class TodoListService
 * @namespace wu.services
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
     getTodosRequestStream(obs: Rx.Observable<number>) : Rx.Observable<wu.model.data.ITodoList> {
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
                    const todos = {};
                    response.data.data[0].Todos.forEach( (v: any) => {
                        todos[v.id] =  new Todo(v);
                    });
                    response.data.data[0].Todos = Immutable.Map(todos) as any;

                    return new TodoList(response.data.data[0] as any);
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
                return Rx.Observable.fromPromise(this.axios.put(`http://localhost:3001/todo/${todo.id}`, {
                    data: todo.toJS()
                }));
            }).map( (response: ITodoResponse) => {
                if (response instanceof Err.BaseError) {
                    return response as any;
                } else if (_.get(response, 'data.success', false) === false || _.get(response, 'data.data[0].id', false) === false) {
                    return new Err.InvalidResponseDataError();
                } else {
                    return new Todo(response.data.data[0] as any);
                }
            });
    }
}

const todoListService = new TodoListService();

export default todoListService;