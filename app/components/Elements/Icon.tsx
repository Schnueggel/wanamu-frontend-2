import * as React from 'react';
import * as classNames from 'classnames';

interface IconProps {
    name: string;
    className?:string;
    onClick?: Function;
}

export class Icon extends React.Component<IconProps, any> {

    static propTypes: any = {
        name: React.PropTypes.string
    };

    static defaultProps: IconProps = {
        name: '',
        onClick: () => {}
    };

    constructor(props:IconProps){
        super(props);
    }

    handleClick() {
        this.props.onClick();
    }
    render() {
        return (
            <i className={classNames('material-icons', this.props.className)} onClick={this.handleClick.bind(this)}>{this.props.name}</i>
        );
    }
}