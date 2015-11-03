import * as React from 'react';
import Menu from './Menu/Menu';
import AppStateModel from '../models/AppStateModel';

class PageProps {
    children: any
}

export default class Page extends React.Component<PageProps, any> {

    constructor(props:PageProps){
        super(props);
        this.state = new AppStateModel();
    }

    render(){
        return (
            <div>
                <div>
                    <h1>Wanamu Page!!!</h1>
                </div>
                <nav>
                    <Menu {...this.state.menu}/>
                </nav>
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}