import * as React from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { doLoadFriendList } from '../actions/FriendListAction';
import * as _ from 'lodash';

export interface IRefs {
    [key: string]: React.Component<any, any>;
}

/**
 * Container Component Login
 */
export class Friends extends React.Component<any, any> implements React.ComponentLifecycle<any, any> {

    refs:IRefs;
    constructor(props:any) {
        super(props);
    }

    componentWillMount() {
        this.props.actions.doLoadFriendList();
    }

    componentWillReceiveProps(nextProps: any) {}

    render() {
        return null;
    }
}

function mapStateToProps(state: wu.IState) {
    return {
        friends: state.friends
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            routeActions: bindActionCreators(routeActions, dispatch),
            doLoadFriendList: bindActionCreators(doLoadFriendList, dispatch)
        }
    };
}

const connected = connect(mapStateToProps, mapDispatchToProps)(Friends);

export default connected;
