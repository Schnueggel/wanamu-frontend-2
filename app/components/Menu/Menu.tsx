import * as React from 'react';
import MenuList from './MenuList';

export default class Menu extends React.Component<wu.MenuProps, any> {
    constructor(props:wu.MenuProps){
        super(props);
    }

    render() {
        return (
            <MenuList items={this.props.items} />
        );
    }
}
