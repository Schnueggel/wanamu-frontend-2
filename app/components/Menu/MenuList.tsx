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
        const items = this.props.items || [],
            list = items.map((item: wu.MenuItemData, i:number) => {
                return <MenuItem {...item} key={i}/>
            });

        return (
            <ul className="menu">
                {list}
            </ul>
        );
    }
}