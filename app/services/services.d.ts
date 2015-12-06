declare module wu {
    module services {
        interface IDataResponse<T> extends axios.Response {
            data : {
                success: boolean;
                error: any;
                data: Array<T>
            }
        }

        interface ILoginResponse extends IDataResponse<wu.model.data.IUserData> {}

        interface IRegistrationResponse extends IDataResponse<wu.model.data.IUserData>{}
    }

}
