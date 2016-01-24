import * as React from 'react';

export interface IButtonProps extends __React.Props<IButtonProps> {
    onClick?: Function,
    className?: string,
    disabled?: boolean
}

export class Button extends React.Component<IButtonProps, any> {

    refs: any = {
        button: HTMLButtonElement
    };

    static defaultProps: IButtonProps = {
        className: '',
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
        return (<button className={`button ${this.props.className}`} type="button"
                        onClick={this.handleClick.bind(this)} ref="button" disabled={this.props.disabled}>
            {this.props.children}
        </button>);
    }
}
