/// <reference path="./data/model.d.ts" />

declare module wu {
    module model.state {
        export interface ILoginStateModel {
            errorMessage: string;
            email : string;
            emailErrors : Array<string>;
            passwordErrors : Array<string>;
            user: wu.model.data.IUser;
            changeStateStream: Rx.Subject<ILoginStateModel>;
            notifyStateChange(): void;
        }
    }
}