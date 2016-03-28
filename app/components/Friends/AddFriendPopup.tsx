import * as React from 'react';
import { Popup } from '../Elements/Popup';
import { Button } from '../Elements/Button';
import { TextInput } from '../Form/TextInput';
import * as classNames from 'classnames';
import { hideAddFriendPopup, doAddFriend } from '../../actions/FriendListAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ValidationPatterns } from '../../constants';
import * as _ from 'lodash';
import { Spinner } from '../Elements/Spinner';

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
        username: TextInput;
        button: Button;
    };

    state: any = {
        btnDisabled: true
    };

    static defaultProps: IAddFriendPopupProps = {
        className: '',
        visible: false
    };

    constructor(props:IAddFriendPopupProps) {
        super(props);
    }

    handleAddFriend() {
        if (ValidationPatterns.minLength(3).test(_.get(this.refs, 'username.state.value', ''))) {
            this.props.actions.doAddFriend(this.refs.username.state.value);
        }
    }

    handleChange() {
        this.setState({
            btnDisabled: !this.refs.username.state.valid
        });
    }

    render() {
        return (
            <Popup className={classNames('add-friend', this.props.className)} visible={this.props.friends.isFriendPopupVisible} title="Add Friend" onCancel={this.props.actions.hideAddFriendsPop}>
                <TextInput type="text" pattern={ValidationPatterns.minLength(3)} ref="username" label="Username or Email" onChange={this.handleChange.bind(this)}/>
                <div className="actionbar">
                    <Spinner hide={this.props.friends.isAdding} />
                    <Button onClick={this.handleAddFriend.bind(this)} disabled={this.state.btnDisabled || this.props.friends.isAdding} ref="button">Add Friend</Button>
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

