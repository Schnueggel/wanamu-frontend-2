import * as React from 'react';

export interface ISpinnerProps extends __React.Props<ISpinnerProps> {
    className?: string
}

export class Spinner extends React.Component<ISpinnerProps, any> {

    static defaultProps: ISpinnerProps = {
        className: ''
    };

    constructor(props:ISpinnerProps){
        super(props);
    }

    render() {
        return (<div className={`spinner ${this.props.className}`}></div>);
    }
}
