import * as React from 'react';
import MenuItem from './MenuItem';

export default class MenuList extends React.Component<wu.MenuListProps, any> {

    static propTypes: any = {
        items: React.PropTypes.array
    };

    constructor(props: wu.MenuListProps) {
        super(props);
    }

    render() {
        const items = this.props.items || [];
        return (
            <ul className="menu">
                {items.map((item: wu.MenuItemData) => {
                    return <MenuItem {...item} />
                    })}
            </ul>
        );
    }
}