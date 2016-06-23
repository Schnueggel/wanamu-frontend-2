import {watchTodoListLoad} from './todolist';
import {watchTodoUpdate} from './todo';

export default function* root () {
    yield [
        watchTodoListLoad(),
        watchTodoUpdate()
    ];
}
