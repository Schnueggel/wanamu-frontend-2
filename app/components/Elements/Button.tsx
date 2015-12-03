import * as React from 'react';

export interface IButtonProps extends __React.Props<IButtonProps> {
    icon?: string;
    onClick?: Function,
    text?: string;
    className?: string,
    disabled?: boolean
}

export class Button extends React.Component<IButtonProps, any> {

    refs: any = {
        button: HTMLButtonElement
    };

    static defaultProps: IButtonProps = {
        icon: '',
        className: '',
        text: '',
        disabled: false
    };

    constructor(props:IButtonProps){
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
            {this.props.text}
        </button>);
    }
}
