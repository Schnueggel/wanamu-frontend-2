import * as React from 'react';
import {NotificationListItem} from './NotificationListItem';

export interface INotificationListProps extends __React.Props<INotificationListProps> {
    notifications: wu.model.data.IFriend[];
}

/**
 * @class NotificationList
 * @namespace wu.components.Notifications
 */
export class NotificationList extends React.Component<INotificationListProps, any> implements __React.ComponentLifecycle<INotificationListProps, any> {

    static defaultProps: INotificationListProps = {
        notifications    : null
    } as INotificationListProps;

    /**
     * Constructor
     * @param props
     */
    constructor(props: INotificationListProps) {
        super(props);
    }

    /**
     * React lifecycle
     * @param nextProps
     * @param nextState
     */
    shouldComponentUpdate(nextProps: INotificationListProps, nextState: any) {
        return nextProps.notifications !== this.props.notifications;
    }

    /**
     *
     * @returns {any}
     */
    render() {
        return (<div className="notification-list">
            {this.createNotifications()}
        </div>);
    }

    createNotifications() {
        if (Array.isArray(this.props.notifications) === false) {
            return null;
        }

        return this.props.notifications.map(this.createNotification.bind(this));
    }

    createNotification(notification: wu.model.data.INotification) {
        return <NotificationListItem {...notification} />
    }
}
