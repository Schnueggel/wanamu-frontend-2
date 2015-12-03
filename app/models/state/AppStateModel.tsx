import * as Rx from 'rx';
import * as _ from 'lodash';
import {LoginStateModel} from 'models/state/LoginStateModel';
import {TodosStateModel} from 'models/state/TodosStateModel';
import {BaseStateModel} from 'models/state/BaseStateModel';
import {Notify} from 'models/decorators/NotifyDecorator';

/**
 * Represents the state of the App
 */
export class AppStateModel extends BaseStateModel<AppStateModel> {

    private _menuItems: wu.IMenuItemData[];
    private _appStarted: boolean = false;

    authMenuItems: wu.IMenuItemData[] = [
        {text:'Home', url: '/'},
        {text:'TodoList', url: '/todolist'},
        {text:'Logout', url: '/logout'}
    ];
    noAuthMenuItems: wu.IMenuItemData[] = [
        {text:'Home', url: '/'},
        {text:'Login', url: '/login'},
        {text:'Register', url: '/register'}
    ];

    login: LoginStateModel;
    todos: TodosStateModel;

    constructor() {
        super();
        this._menuItems = this.noAuthMenuItems;
        this.login = new LoginStateModel();
        this.todos = new TodosStateModel();

        //Notify AppState change on SubState changes
        this.login.changeStateStream.subscribe(this.loginChanged.bind(this));
        this.todos.changeStateStream.subscribe(this.notify.bind(this));
        this.changeStateStream = this.changeStateStream.debounce(300);
    }

    isAuthedPath(path) {
        return _.find(this.noAuthMenuItems, 'url', `/${path.split('/')[1]}`) === undefined
    }

    loginChanged() {
        if (this.login.user) {
            this.authMenuItems[1].url = `/todolist/${this.login.user.DefaultTodoListId}`;
            this.menuItems = this.authMenuItems;
        } else {
            this.menuItems = this.noAuthMenuItems;
        }
    }

    @Notify
    get menuItems():wu.IMenuItemData[] {
        return this._menuItems;
    }

    set menuItems(value:wu.IMenuItemData[]) {
        this._menuItems = value;
    }

    @Notify
    get appStarted():boolean {
        return this._appStarted;
    }

    set appStarted(value:boolean) {
        this._appStarted = value;
    }
}

const AppState = new AppStateModel();

export default AppState;