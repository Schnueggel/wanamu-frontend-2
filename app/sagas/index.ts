import {watchTodoListLoad} from './todolist';
import {watchTodoUpdate} from './todo';
import {watchLogoutRequest} from './auth';

export default function* root () {
    yield [
        watchTodoListLoad(),
        watchTodoUpdate(),
        watchLogoutRequest()
    ];
}
