import * as React from 'react';
import * as _ from 'lodash';

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
        onFriendDelete: () => {}
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

    /**
     *
     * @returns {any}
     */
    render() {
        return (<div className="friend">
            <div className={`friend`}>
                <div className="friend__content">
                    <div>{this.props.friend.firstname} {this.props.friend.lastname}</div>
                </div>
            </div>
        </div>);
    }
}
