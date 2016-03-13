import * as React from 'react';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { doLoadFriendList, doDeleteFriend } from '../actions/FriendListAction';
import * as _ from 'lodash';
import { FriendList } from '../components/Friends/FriendList';
import { Button } from '../components/Elements/Button';

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
        return (
            <div className="friends">
                <div className="actionbar">
                    <Button>Add Friend</Button>
                </div>
                <FriendList friends={this.props.friends.friends} onFriendDelete={this.props.actions.doDeleteFriend} />
            </div>
        );
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
            routerActions: bindActionCreators(routerActions, dispatch),
            doLoadFriendList: bindActionCreators(doLoadFriendList, dispatch),
            doDeleteFriend: bindActionCreators(doDeleteFriend, dispatch)
        }
    };
}

const connected = connect(mapStateToProps, mapDispatchToProps)(Friends);

export default connected;
