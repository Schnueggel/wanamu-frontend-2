import MenuModel from './MenuModel';
import * as Rx from 'rx';
import {LoginStateModel} from './LoginStateModel';
import {TodosStateModel} from './TodosStateModel';
import {BaseStateModel} from "./BaseStateModel";
import {Notify} from './decorators/NotifyDecorator';

/**
 * Represents the state of the App
 */
export class AppStateModel extends BaseStateModel<AppStateModel> {
    private _triedToLoadUser: boolean = false;
    menu: any;
    login: LoginStateModel;
    todos: TodosStateModel;

    constructor() {
        super();
        this.menu = new MenuModel();
        this.login = new LoginStateModel();
        this.todos = new TodosStateModel();

        //Notify AppState change on SubState changes
        this.login.changeStateStream.subscribe(this.notify.bind(this));
        this.todos.changeStateStream.subscribe(this.notify.bind(this));
    }


    @Notify
    get triedToLoadUser(): boolean {
        return this._triedToLoadUser;
    }

    set triedToLoadUser(value:boolean) {
        this._triedToLoadUser = value;
    }
}

const AppState = new AppStateModel();

export default AppState;