import * as React from 'react';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import * as friendListActions from '../actions/FriendListAction';
import { FriendList } from '../components/Friends/FriendList';
import { Button } from '../components/Elements/Button';
import { AddFriendPopup } from '../components/Friends/AddFriendPopup';
import * as classNames from 'classnames';

/**
 * Container Component Login
 */
export class Friends extends React.Component<wu.IFriendProps, any> implements React.ComponentLifecycle<any, any> {

    state: any = {
        showFriendPopup: false
    };

    constructor(props: wu.IFriendProps) {
        super(props);
    }

    componentWillMount() {
        this.props.actions.fla.doLoadFriendList();
    }

    componentWillReceiveProps(nextProps: any) {}

    handleAddFriend(usernameEmail: string) {
        this.props.actions.fla.hideAddFriendsPopup();
        this.props.actions.fla.doAddFriend(usernameEmail);
    }

    render() {
        const addBtnClass = classNames({
            hidden: this.props.friends.friends.length < 2
        });

        return (
            <div className="friends">
                <div className="actionbar">
                    <Button onClick={this.props.actions.fla.showAddFriendsPopup} className={addBtnClass}>Add Friend</Button>
                </div>
                <FriendList friends={this.props.friends.friends} 
                            onFriendDelete={this.props.actions.fla.doDeleteFriend} 
                            onFriendAccept={this.props.actions.fla.doAcceptFriend}
                            onFriendAdd={this.props.actions.fla.showAddFriendsPopup}/>

                <AddFriendPopup onAdd={this.handleAddFriend.bind(this)}
                                showLoading={this.props.friends.isAdding}
                                visible={this.props.friends.isFriendsPopupVisible}
                                onCancel={this.props.actions.fla.hideAddFriendsPopup} />
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
            routerActions: bindActionCreators(routerActions as any, dispatch),
            fla: bindActionCreators(friendListActions, dispatch)
        }
    };
}

const connected = connect(mapStateToProps, mapDispatchToProps)(Friends);

export default connected;
