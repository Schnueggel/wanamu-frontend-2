'use strict';

export class TodoListNotFoundError extends Error {
    public name: string = 'TodoListNotFoundError';
    public message : string = 'No valid TodoList could be found';
}

