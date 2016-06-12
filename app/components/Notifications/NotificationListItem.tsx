import * as React from 'react';

export interface INotificationListItemProps extends __React.Props<INotificationListItemProps> {
    title: string;
    message: string;
}

/**
 * @class NotificationListItem
 * @namespace wu.components.Notifications
 */
export class NotificationListItem extends React.Component<INotificationListItemProps, any> implements React.ComponentLifecycle<INotificationListItemProps, any> {

    state: any = {};

    static defaultProps: INotificationListItemProps = {
        title: null,
        message: null
    } as INotificationListItemProps;

    /**
     * Constructor
     * @param props
     */
    constructor(props: INotificationListItemProps) {
        super(props);
    }

    /**
     *
     * @returns {any}
     */
    render() {

        return (
            <div className="notification">
                <div className="notification__content">
                    <div className="notification__title">{this.props.title}</div>
                    <div className="notification__message">{this.props.message}</div>
                </div>
            </div>
        );
    }
}
