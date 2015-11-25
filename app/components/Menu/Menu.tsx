import * as React from 'react';
import {Link, IndexLink} from 'react-router';

export interface IMenuProps {
    title: string;
    items: Array<wu.IMenuItemData>;
}

export default class Menu extends React.Component<IMenuProps, any> {

    refs: any = {
        menu: HTMLDivElement
    };

    constructor(props:IMenuProps){
        super(props);
    }

    handleNavLinkClick() {
        (document.body.querySelector('.mdl-layout__obfuscator.is-visible') as HTMLElement).click();
    }

    render() {
        const list = this.props.items.map(this.createMenuItem.bind(this));
        return (
            <div className="mdl-layout__drawer" ref="menu">
                <span className="mdl-layout-title">{this.props.title}</span>
                <nav className="mdl-navigation">
                    {list}
                </nav>
            </div>
        );
    }

    createMenuItem ({text, url}) {
        if (url === '/') {
            return <IndexLink className="mdl-navigation__link" to={url} activeClassName="active" key={url} onClick={this.handleNavLinkClick.bind(this)}>{text}</IndexLink>
        }
        return <Link className="mdl-navigation__link" to={url} activeClassName="active" onClick={this.handleNavLinkClick.bind(this)} key={url}>{text}</Link>
    }
}
