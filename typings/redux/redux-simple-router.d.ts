///
declare module ReduxSimpleRouter {
    import R = Redux;
    import H = HistoryModule;

    export const TRANSITION: string;
    export const UPDATE_LOCATION: string;

    interface HistoryMiddleware<S> extends R.Middleware {
        listenForReplays(store: R.Store, selectRouterState?: Function): void;
        unsubscribe(): void;
    }

    type LocationDescriptorObject = {
        pathname: H.Pathname;
        search: H.QueryString;
        query: H.Query;
        state: H.LocationState;
    };

    type LocationDescriptor = LocationDescriptorObject | H.Path;

    interface RouteActions {
        push(nextLocation: LocationDescriptor): void;
        replace(nextLocation: LocationDescriptor): void;
        go(n: number): void;
        goForward(): void;
        goBack: void;
    }

    function syncHistory<S>(history: H.History): HistoryMiddleware<S>;
    function routeReducer(): any; // can't set to R.Reducer for some reasons

    const routeActions: RouteActions;
}

declare module "redux-simple-router" {
    export = ReduxSimpleRouter;
}