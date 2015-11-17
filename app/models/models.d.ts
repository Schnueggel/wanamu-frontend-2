/// <reference path="./data/model.d.ts" />

declare module wu {
    module model.state {
        export interface IBaseStateModel<T> {
            changeStateStream: Rx.Subject<T>;
            notify(): void;
        }
        export interface ILoginStateModel extends IBaseStateModel<ILoginStateModel>{
            errorMessage: string;
            email : string;
            emailErrors : Array<string>;
            passwordErrors : Array<string>;
            user: wu.model.data.IUser;
        }

        export interface ITodoStateModel extends IBaseStateModel<ITodoStateModel> {
            todolist: wu.model.data.ITodoList;
        }
    }
}