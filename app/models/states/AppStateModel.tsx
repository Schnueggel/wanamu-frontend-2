import * as _ from 'lodash';
import * as Actions from 'actions/actions';
import { LoginStateModel } from 'models/states/LoginStateModel';
import { TodosStateModel } from 'models/states/TodosStateModel';
import { BaseStateModel } from 'models/states/BaseStateModel';
import { RegisterStateModel } from 'models/states/RegisterStateModel';
import { Notify } from 'models/decorators/NotifyDecorator';
import { configService } from '../../services/ConfigService';

/**
 * Represents the state of the App
 * @class AppStateModel
 * @namespace wu.models.state
 */
export class AppStateModel extends BaseStateModel<AppStateModel> implements wu.model.states.IAppStateModel {

    private _menuItems: wu.IMenuItemData[];
    private _appReady: boolean = false;
    private _config: wu.model.data.IConfig;
    private _configError: Error        = null;
    private _isBootstrapping: boolean  = false;
    private _isConfigLoading: boolean  = false;
    private _bootstrappingError: Error = null;

    /**
     * TODO perhaps move this to a view model
     * Menu items for authed user
     * @type {{text: string, url: string}[]}
     */
    authMenuItems: wu.IMenuItemData[] = [
        {text: 'Home', url: '/'},
        {text: 'TodoList', url: '/todolist'},
        {text: 'Logout', url: '/logout'}
    ];

    /**
     * TODO perphaps move this to a view model
     * Menu Items for non authed users
     * @type {{text: string, url: string}[]}
     */
    noAuthMenuItems: wu.IMenuItemData[] = [
        {text: 'Home', url: '/'},
        {text: 'Login', url: '/login'},
        {text: 'Register', url: '/register'}
    ];

    /**
     * SubState Login
     */
    login: LoginStateModel;
    /**
     * Substate Todos
     */
    todos: TodosStateModel;

    register: RegisterStateModel;

    /**
     * AppStateModel
     */
    constructor() {
        super();

        this._menuItems = this.noAuthMenuItems;

        // Sub App States
        this.login    = new LoginStateModel();
        this.todos    = new TodosStateModel();
        this.register = new RegisterStateModel();

        //Notify AppState change on SubState changes
        this.login.changeStateStream.subscribe(this.loginChangedObserver.bind(this));
        this.todos.changeStateStream.subscribe(this.notify.bind(this));
        this.register.changeStateStream.subscribe(this.notify.bind(this));

        // Debounce changes on AppState  to lower impact on react
        this.changeStateStream = this.changeStateStream.debounce(300);

        Actions.configAction.configRequestStartSubject.subscribe(() => {
            this._config         = null;
            this.isConfigLoading = true;
        });

        Actions.configAction.configRequestSuccessStream.subscribe((config: wu.model.data.IConfig) => {
            this._configError = null;
            configService.config = config;
            this.config       = config;
        });

        Actions.configAction.configRequestErrorStream.subscribe((err: Error) => {
            this.configError = err;
        });

        Actions.configAction.configRequestStream.subscribe(() => {
            this.isConfigLoading = false;
        });

        Actions.bootstrapAction.bootstrapRequestErrorStream.subscribe(err => this.bootstrappingError = err);
        Actions.bootstrapAction.bootstrapRequestStream.subscribe(() => this.isBootstrapping = false);
        Actions.bootstrapAction.bootstrapRequestStartStream.subscribe(() => this.isBootstrapping = true);
        Actions.bootstrapAction.bootstrapRequestSuccessStream.subscribe(() => {
            this._bootstrappingError = null;
            this.appReady            = true;
        });
    }

    /**
     * Check if route path needs authentication
     * @param path
     * @returns {boolean}
     */
    isAuthedPath(path) {
        return _.find(this.noAuthMenuItems, 'url', `/${path.split('/')[1]}`) === undefined
    }

    /**
     * Observer for login state changes
     */
    loginChangedObserver() {
        if (this.login.user) {
            // The the path to the TodoList depends on the users default todolist id. This is neccessary as at the moment a user can have only one todolist.
            // TODO Optional we can use the TodoList Controller Component redirect to user.DefaultTodoListId feature. Lets thinks about it.
            this.authMenuItems[1].url = `/todolist/${this.login.user.DefaultTodoListId}`;
            this.menuItems            = this.authMenuItems;
        } else {
            this.menuItems = this.noAuthMenuItems;
        }
    }

    @Notify
    get menuItems(): wu.IMenuItemData[] {
        return this._menuItems;
    }

    set menuItems(value: wu.IMenuItemData[]) {
        this._menuItems = value;
    }

    @Notify
    get appReady(): boolean {
        return this._appReady;
    }

    set appReady(value: boolean) {
        this._appReady = value;
    }

    @Notify
    get config(): wu.model.data.IConfig {
        return this._config;
    }

    set config(value: wu.model.data.IConfig) {
        this._config = value;
    }

    @Notify
    get configError(): Error {
        return this._configError;
    }

    set configError(value: Error) {
        this._configError = value;
    }

    @Notify
    get isBootstrapping(): boolean {
        return this._isBootstrapping;
    }

    set isBootstrapping(value: boolean) {
        this._isBootstrapping = value;
    }

    @Notify
    get isConfigLoading(): boolean {
        return this._isConfigLoading;
    }

    set isConfigLoading(value: boolean) {
        this._isConfigLoading = value;
    }

    @Notify
    get bootstrappingError(): Error {
        return this._bootstrappingError;
    }

    set bootstrappingError(value: Error) {
        this._bootstrappingError = value;
    }
}

export const AppState = new AppStateModel();
