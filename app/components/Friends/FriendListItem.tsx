import * as React from 'react';
import * as _ from 'lodash';
import {IconButton} from '../Elements/IconButton';

export interface IFriendListItemProps extends __React.Props<IFriendListItemProps> {
    friend: wu.model.data.IFriend;
    onFriendDelete?(friend: wu.model.data.IFriend);
}

/**
 * @class TodoList
 * @namespace wu.components.TodoList
 */
export class FriendListItem extends React.Component<IFriendListItemProps, any> implements React.ComponentLifecycle<IFriendListItemProps, any> {

    state: any = {};

    static defaultProps: IFriendListItemProps = {
        friend: null,
        onFriendDelete: (friend: wu.model.data.IFriend) => {}
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
        this.props.onFriendDelete(this.props.friend);
    }

    /**
     *
     * @returns {any}
     */
    render() {

        return (
            <div className={`friend`}>
                <div className="friend__content">
                    <div className="friend__name">{this.getName()} {}</div>
                    <span className="spacer"></span>
                    <IconButton className="action" icon="delete" onClick={this.handleDelete.bind(this)} />
                </div>
            </div>
        );
    }

    getName() {
        if (_.isString(this.props.friend.firstname) && _.isString(this.props.friend.lastname)) {
            `${this.props.friend.firstname} ${this.props.friend.firstname} (${this.props.friend.username})`;
        }

        if (this.props.friend.pending) {
            return `${this.props.friend.username} (pending)`;
        }
        return '';
    }
}
