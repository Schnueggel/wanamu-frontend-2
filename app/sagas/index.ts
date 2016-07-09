import {watchTodoListLoad} from './todolist';
import {watchTodoUpdate, watchTodoCreate, watchTodoDelete, watchTodoFinish} from './todo';
import {watchLogoutRequest} from './auth';
import {watchDeleteFriendRequest} from './friend';
import {watchLoadNotifications} from './notification';

export default function* root () {
    yield [
        watchTodoListLoad(),
        watchTodoUpdate(),
        watchTodoCreate(),
        watchLogoutRequest(),
        watchTodoDelete(),
        watchTodoFinish(),
        watchDeleteFriendRequest(),
        watchLoadNotifications()
    ];
}
