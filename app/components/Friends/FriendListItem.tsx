import * as React from 'react';
import * as _ from 'lodash';
import {IconButton} from '../Elements/IconButton';
import * as classNames from 'classnames';

export interface IFriendListItemProps extends __React.Props<IFriendListItemProps> {
    friend: wu.model.data.IFriend;
    onDelete?(friend: wu.model.data.IFriend);
    onAccept?(friend: wu.model.data.IFriend);
}

/**
 * @class FriendListItem
 * @namespace wu.components.Friends
 */
export class FriendListItem extends React.Component<IFriendListItemProps, any> implements React.ComponentLifecycle<IFriendListItemProps, any> {

    state: any = {};

    static defaultProps: IFriendListItemProps = {
        friend: null,
        onDelete: (friend: wu.model.data.IFriend) => {},
        onAccept: (friend: wu.model.data.IFriend) => {}
    } as IFriendListItemProps;

    /**
     * Constructor
     * @param props
     */
    constructor(props: IFriendListItemProps) {
        super(props);
    }

    /**
     * React lifecycle
     * @param nextProps
     * @param nextState
     */
    shouldComponentUpdate(nextProps: IFriendListItemProps, nextState: any) {
        return nextProps.friend !== this.props.friend;
    }

    handleDelete() {
        this.props.onDelete(this.props.friend);
    }

    handleAccept() {
        this.props.onAccept(this.props.friend);
    }

    /**
     *
     * @returns {any}
     */
    render() {
        const componentClass = classNames('friend', {
            invitation: this.props.friend.invitation,
            pending: this.props.friend.pending
        });
        const acceptBtnClass = classNames({
            hidden: !this.props.friend.invitation
        });

        return (
            <div className={componentClass}>
                <div className="friend__content">
                    <div className="friend__name">{this.getName()} {}</div>
                    <span className="spacer"></span>
                    <IconButton className={acceptBtnClass} icon="done" onClick={this.handleAccept.bind(this)}/>
                    <IconButton className="action" icon="delete" onClick={this.handleDelete.bind(this)} />
                </div>
            </div>
        );
    }

    getName() {
        if (_.isString(this.props.friend.firstname) && _.isString(this.props.friend.lastname)) {
            `${this.props.friend.firstname} ${this.props.friend.lastname} (${this.props.friend.username})`;
        }

        return `${this.props.friend.username}`;

    }
}
