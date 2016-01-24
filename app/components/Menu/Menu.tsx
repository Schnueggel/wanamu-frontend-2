import * as React from 'react';
import { Link, IndexLink } from 'react-router';

export default class Menu extends React.Component<wu.IMenuProps, any> {

    refs: any = {
        menu: HTMLDivElement
    };

    constructor(props: wu.IMenuProps){
        super(props);
    }

    handleNavLinkClick() {
    }

    render() {
        const list = this.props.items.map(this.createMenuItem.bind(this));
        return (
            <div className={`menu ${this.props.className}`} ref="menu">
                <h3 className="title">{this.props.title}</h3>
                <nav className="navigation">
                    {list}
                </nav>
            </div>
        );
    }

    createMenuItem ({text, url}) {
        if (url === '/') {
            return <IndexLink className="link" to={url} activeClassName="active" key={url} onClick={this.handleNavLinkClick.bind(this)}>{text}</IndexLink>
        }
        return <Link className="link" to={url} activeClassName="active" onClick={this.handleNavLinkClick.bind(this)} key={url}>{text}</Link>
    }
}
