import {watchTodoListLoad} from './todolist';

export default function* root () {
    yield [
        watchTodoListLoad()
    ];
}
