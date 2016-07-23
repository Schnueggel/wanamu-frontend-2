import {watchTodoListLoad} from './todolist';
import {watchTodoUpdate, watchTodoCreate, watchTodoDelete, watchTodoFinish} from './todo';
import {watchLogoutRequest} from './auth';
import {watchDeleteFriendRequest} from './friend';
import {watchLoadNotifications, watchMarkNotifications} from './notification';
import {watchRegister} from './register';

export default function* root () {
    yield [
        watchTodoListLoad(),
        watchTodoUpdate(),
        watchTodoCreate(),
        watchLogoutRequest(),
        watchTodoDelete(),
        watchTodoFinish(),
        watchDeleteFriendRequest(),
        watchLoadNotifications(),
        watchMarkNotifications(),
        watchRegister()
    ];
}
