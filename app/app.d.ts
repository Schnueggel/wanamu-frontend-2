/// <reference path="./components/Form/form.d.ts" />
/// <reference path="./models/models.d.ts" />

// Material-Design-Lite
declare interface ComponentHandler {
    upgradeDom();
    upgradeElement(element: Element, jsClass?:string)
}

declare const componentHandler:ComponentHandler;

declare function require(url:string);

declare namespace __React {
    /**
     * Declare Attributes that come from material-lite
     */
    interface HTMLAttributes {
        'for'?: string;
        'is'?: any;
        'class'?: any;
        'hide'?: boolean;
    }
}

declare module wu {
    interface IMenuItemData {
        text: string;
        url: string;
    }
}
declare module 'history/lib/createBrowserHistory' {

    interface createBrowserHistory {
        (): History;
    }
    export default createBrowserHistory;
}

declare module ReactRouter {
    interface IndexLinkClass extends ReactRouter.LinkClass{}
    let IndexLink:IndexLinkClass;
}


declare module axios {


    interface success {
        (response: Response) : void
    }
    interface error {
        error(error: Error) : void;
    }

    interface AxiosInstance {
        interceptors: {
            request: Interceptor,
            response: Interceptor
        }
    }

    interface AxiosStatic {
        interceptors: {
            request: Interceptor,
            response: Interceptor
        }
    }

    interface Interceptor {
        use(success :success, error?: error): void;
        eject(interceptor: Interceptor);
    }
}
