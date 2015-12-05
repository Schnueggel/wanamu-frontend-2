import { Record, Map as ImMap } from 'immutable';

export const TodoList = Record<wu.model.data.ITodoListClass>({id: 0, name:'', Todos: ImMap<number,wu.model.data.ITodo>() }, 'TodoList');
