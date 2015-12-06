import { Record, Map as ImMap } from 'immutable';


export  const defaultRecord: wu.model.data.ITodoListClass = {
    id: 0,
    name:'',
    Todos: ImMap<string,wu.model.data.ITodo>()
};

export const TodoList = Record<wu.model.data.ITodoListClass>( defaultRecord, 'TodoList');
