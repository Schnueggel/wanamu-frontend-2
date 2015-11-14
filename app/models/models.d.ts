/// <reference path="./data/model.d.ts" />

declare module wu {
    module model.state {
        export interface ILoginState {
            errorMessage: string;
            email : string;
            emailErrors : Array<string>;
            passwordErrors : Array<string>;
            user: wu.model.data.IUser;
        }
    }
}