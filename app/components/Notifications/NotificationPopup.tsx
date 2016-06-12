import * as React from 'react';
import { Popup } from '../Elements/Popup';
import { NotificationList } from './NotificationList';

export interface INotificationPopupProps extends __React.Props<INotificationPopupProps> {
    notifications?: Array<any>;
    visible: boolean;

}

export class NotificationPopup extends React.Component<INotificationPopupProps, any> implements React.ComponentLifecycle<INotificationPopupProps, any> {

    ctrls: {} = {} as any;

    static defaultProps: INotificationPopupProps = {
        visible: false,
        notifications: []
    };

    constructor(props:INotificationPopupProps) {
        super(props);
    }

    render() {
        return (
            <Popup className="notification-popup" visible={this.props.visible}>
                <NotificationList notifications={this.props.notifications}/>
            </Popup>
        );
    }
}
