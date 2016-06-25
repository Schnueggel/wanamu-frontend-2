import {watchTodoListLoad} from './todolist';
import {watchTodoUpdate, watchTodoCreate} from './todo';
import {watchLogoutRequest} from './auth';

export default function* root () {
    yield [
        watchTodoListLoad(),
        watchTodoUpdate(),
        watchTodoCreate(),
        watchLogoutRequest()
    ];
}
