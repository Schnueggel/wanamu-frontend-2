import * as React from 'react';

declare module ReactRouter {

    interface RoutePropsBase {
        component?: React.Component<any,any>;
        components?: React.Component<any,any>;
    }
    interface RouteProps extends RoutePropsBase {
        path?: any
    }
    interface RouteProp {
        name?: string;
        path?: string;
        component?: React.Component<any,any>;
        handler?: React.ComponentClass<any>;
        ignoreScrollBehavior?: boolean;
    }
    interface IndexRouteProps extends RoutePropsBase {
    }
    interface IndexRoute extends React.ComponentClass<IndexRouteProps> {
    }
}
