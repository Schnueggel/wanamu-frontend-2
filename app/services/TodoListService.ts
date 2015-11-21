import * as _ from 'lodash';
import * as Rx from 'rx';
import {BaseDataService} from "./BaseDataService";
import ITodoList = wu.model.data.ITodoList;
import * as Err from '../errors/errors';
import {TodoList} from "../models/data/TodoList";

export interface TodoListResponse extends axios.Response {
    data: {data: Array<wu.model.data.ITodoListData>};
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
            .map((response: TodoListResponse) => {
                if (response instanceof Err.BaseError) {
                    return response as any;
                } else if (_.get(response, '.data.data[0].id', false) === false){
                    return new Err.InvalidResponseDataError();
                } else {
                    return new TodoList(response.data.data[0]);
                }
            });
    }
}

const todoListService = new TodoListService();

export default todoListService;