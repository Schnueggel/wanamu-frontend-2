import * as React from 'react';
import * as _ from 'lodash';
import { FriendListItem } from './FriendListItem';

export interface IFriendListProps extends __React.Props<IFriendListProps> {
    friends: wu.model.data.IFriend[];
    onFriendDelete?(friend: wu.model.data.IFriend);
    onFriendAdd?();
}

/**
 * @class FriendList
 * @namespace wu.components.FriendList
 */
export class FriendList extends React.Component<IFriendListProps, any> implements React.ComponentLifecycle<IFriendListProps, any> {

    state: any = {};

    static defaultProps: IFriendListProps = {
        friends    : null,
        onFriendAdd   : () => {},
        onFriendDelete: () => {}
    } as IFriendListProps;

    /**
     * Constructor
     * @param props
     */
    constructor(props: IFriendListProps) {
        super(props);
    }

    /**
     * React lifecycle
     * @param nextProps
     * @param nextState
     */
    shouldComponentUpdate(nextProps: IFriendListProps, nextState: any) {
        return nextProps.friends !== this.props.friends;
    }

    /**
     *
     * @returns {any}
     */
    render() {
        return (<div className="friendlist">
            {this.createFriends()}
            <div className={`friend friend-add`} onClick={this.props.onFriendAdd}>
                <div className="friend__content">+</div>
            </div>
        </div>);
    }

    createFriends() {
        if (Array.isArray(this.props.friends) === false) {
            return null;
        }

        return this.props.friends.map(this.createFriend.bind(this));
    }

    createFriend(friend: wu.model.data.IFriend) {
        return <FriendListItem onFriendDelete={this.props.onFriendDelete} friend={friend} key={friend._id} />
    }
}
