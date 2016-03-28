import * as React from 'react';

export interface ISpinnerProps extends __React.Props<ISpinnerProps> {
    className?: string;
    hide?: boolean;
}

export class Spinner extends React.Component<ISpinnerProps, any> {

    static defaultProps: ISpinnerProps = {
        className: '',
        hide: false
    };

    constructor(props:ISpinnerProps){
        super(props);
    }

    render() {
        if (this.props.hide) return null;
        return (<div className={`spinner ${this.props.className}`}></div>);
    }
}
