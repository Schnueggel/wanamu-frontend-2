import * as React from 'react';

export interface IIconButtonProps extends __React.Props<IIconButtonProps> {
    icon: string;
    onClick?: Function,
    className?: string,
    disabled?: boolean
}

export default class IconButton extends React.Component<IIconButtonProps, any> {

    refs: any = {
        button: HTMLButtonElement
    };

    static defaultProps: IIconButtonProps = {
        icon     : '',
        className: '',
        disabled : false
    };

    constructor(props: IIconButtonProps) {
        super(props);
    }

    handleClick(evt) {
        if (this.props.onClick) {
            this.props.onClick(evt);
        }
    }

    render() {
        return (<button className={`mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect ${this.props.className}`}
                        onClick={this.handleClick.bind(this)} ref="button" disabled={this.props.disabled}>
            <i className="material-icons">{this.props.icon}</i>
        </button>);
    }
}
