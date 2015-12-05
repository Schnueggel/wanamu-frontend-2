import { Record } from 'immutable';

const recordDefault: wu.model.data.ITodoData = {
    id: -1,
    TodoListId: -1,
    title: '',
    alarm: '',
    description: '',
    order: 0,
    repeat: false,
    finished: false,
    deletedAt: null,
    updatedAt: null,
    createdAt: null,
    color: 'color1',
    repeatWeekly: null,
    repeatMonthly: null,
    repeatYearly: null
};

export const Todo = Record<wu.model.data.ITodoClass>(recordDefault, 'Todo');