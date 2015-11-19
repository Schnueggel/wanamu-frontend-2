import * as React from 'react';
import Icon from '../Icon/Icon';

export default class MenuListItem extends React.Component<wu.MenuListItemProps, any> {

    static propTypes: any = {
        text: React.PropTypes.string,
        icon: React.PropTypes.string
    };

    constructor(props: wu.MenuListItemProps){
        super(props);
    }

    render() {

        let icon;
        if (this.props.icon) {
            icon = <Icon name={this.props.icon} />
        }

        return (
            <a className="mdl-navigation__link">{this.props.text}</a>
        );
    }
}