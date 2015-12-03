import * as React from 'react';

interface IconProps {
    name: string;
}

export default class Icon extends React.Component<IconProps, any> {

    static propTypes: any = {
        name: React.PropTypes.string
    };

    constructor(props:IconProps){
        super(props);
    }

    render() {
        return (
            <i className="material-icons">{this.props.name}</i>
        );
    }
}