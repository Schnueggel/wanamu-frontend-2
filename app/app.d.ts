/// <reference path="./components/Menu/menu.d.ts" />
/// <reference path="./components/Form/form.d.ts" />
/// <reference path="./models/data/model.d.ts" />


declare module axios {

    interface success {
        (response: Response) : void
    }
    interface error {
        error(error: Error) : void;
    }

    interface AxiosStatic {
        create(defaultOptions?: axios.InstanceOptions) : AxiosStatic;
        interceptors: {
            request: Interceptor,
            response: Interceptor
        }
    }

    interface InstanceOptions {
        transformRequest?: (data: any) => any;
        transformResponse?: (data: any) => any;
        headers?: any;
        timeout?: number;
        withCredentials?: boolean;
        responseType?: string;
        xsrfCookieName?: string;
        xsrfHeaderName?: string;
        paramsSerializer?: (params: any) => string;
    }

    interface Interceptor {
        use(success :success, error?: error): void;
        eject(interceptor: Interceptor);
    }
}