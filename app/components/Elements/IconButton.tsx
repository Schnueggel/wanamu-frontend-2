import * as React from 'react';
import * as classNames from 'classnames';

export interface IIconButtonProps extends __React.Props<IIconButtonProps> {
    icon: string;
    onClick?: Function,
    className?: string,
    disabled?: boolean
}

export class IconButton extends React.Component<IIconButtonProps, any> {

    refs: any = {
        button: HTMLButtonElement
    };

    static defaultProps: IIconButtonProps = {
        icon     : '',
        className: '',
        disabled : false,
        onClick: () => {}
    };

    constructor(props: IIconButtonProps) {
        super(props);
    }

    handleClick(evt) {
        this.props.onClick(evt);
    }

    render() {
        return (<button className={classNames('button icon', this.props.className)}
                        onClick={this.handleClick.bind(this)} ref="button" disabled={this.props.disabled}>
            <i className="material-icons">{this.props.icon}</i>
        </button>);
    }
}
