import * as React from 'react';
import MenuList from './MenuList';

export default class Menu extends React.Component<wu.MenuProps, any> {
    constructor(props:wu.MenuProps){
        super(props);
    }

    render() {
        return (
            <div className="mdl-layout__drawer">
                <span className="mdl-layout-title">{this.props.title}</span>
                <MenuList items={this.props.items} />
            </div>
        );
    }
}
