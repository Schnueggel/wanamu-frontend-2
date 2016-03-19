import * as React from 'react';
import {Icon} from './Icon';
import * as classNames from 'classnames';

export interface IPopupProps extends __React.Props<IPopupProps> {
    title?: string
    className?: string,
    visible?: boolean,
    onCancel?: Function
}

export class Popup extends React.Component<IPopupProps, any> implements React.ComponentLifecycle<IPopupProps, any> {

    static defaultProps: IPopupProps = {
        className: '',
        visible: false,
        onCancel: () => {}
    };

    constructor(props:IPopupProps){
        super(props);
    }

    render() {
        const popupClasses = classNames({
            popup: true,
            hidden: !this.props.visible
        }, this.props.className);

        return (
            <div className={popupClasses}>
                <div className="popup__body">
                    <div className="popup__head">
                        <span className="popup__title">{this.props.title}</span>
                        <span className="spacer"/>
                        <Icon name="close" className="popup__close" onClick={this.props.onCancel}/>
                    </div>
                    <div className="popup__content">
                    {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
