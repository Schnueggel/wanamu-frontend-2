import * as React from 'react';
import { Popup } from '../Elements/Popup';
import { Button } from '../Elements/Button';
import { TextInput } from '../Form/TextInput';
import * as classNames from 'classnames';
import { hideAddFriendPopup, doAddFriend } from '../../actions/FriendListAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export interface IAddFriendPopupProps extends __React.Props<IAddFriendPopupProps> {
    className?: string,
    visible?: boolean,
    friends?: wu.IFriendsState,
    actions?: {
        hideAddFriendsPop: Function,
        doAddFriend: Function
    }
}

export class AddFriendPopup extends React.Component<IAddFriendPopupProps, any> implements React.ComponentLifecycle<IAddFriendPopupProps, any> {

    refs: {
        [key: string]: React.Component<any, any> | Element;
        email: TextInput;
    };

    static defaultProps: IAddFriendPopupProps = {
        className: '',
        visible: false
    };

    constructor(props:IAddFriendPopupProps) {
        super(props);
    }

    handleAddFriend() {
    }

    render() {
        return (
            <Popup className={classNames('add-friend', this.props.className)} visible={this.props.friends.isFriendPopupVisible} title="Add Friend" onCancel={this.props.actions.hideAddFriendsPop}>
                <TextInput type="email" pattern={/[^ @]*@[^ @]*/} ref="email" label="Email"/>
                <div className="actionbar">
                    <Button onClick={this.handleAddFriend.bind(this)}>Add Friend</Button>
                </div>
            </Popup>
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
            hideAddFriendsPop: bindActionCreators(hideAddFriendPopup, dispatch),
            doAddFriend: bindActionCreators(doAddFriend, dispatch)
        }
    };
}

const connectedPage = connect(mapStateToProps, mapDispatchToProps)(AddFriendPopup);

export default connectedPage;

