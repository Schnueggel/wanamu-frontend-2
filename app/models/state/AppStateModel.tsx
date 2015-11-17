import MenuModel from './MenuModel';
import * as Rx from 'rx';
import {LoginStateModel} from './LoginStateModel';
import {TodosStateModel} from './TodosStateModel';

/**
 * Represents the state of the App
 */
export class AppStateModel {
    menu: any;
    login: LoginStateModel;
    todos: TodosStateModel;
    private _changeStateStream: Rx.Subject<AppStateModel>;

    constructor() {
        this._changeStateStream = new Rx.Subject<AppStateModel>();
        this.menu = new MenuModel();
        this.login = new LoginStateModel();
        this.todos = new TodosStateModel();

        //Notify AppState change on SubState changes
        this.login.changeStateStream.subscribe(this.notifyState.bind(this));
        this.todos.changeStateStream.subscribe(this.notifyState.bind(this));

    }

    notifyState() {
        this._changeStateStream.onNext(this);
    }

    get changeStateStream():Rx.Subject<AppStateModel> {
        return this._changeStateStream;
    }

    set changeStateStream(value:Rx.Subject<AppStateModel>) {
        this._changeStateStream = value;
    }
}

const AppState = new AppStateModel();

export default AppState;