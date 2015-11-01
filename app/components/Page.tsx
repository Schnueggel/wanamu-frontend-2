import * as React from 'react';

class PageProps {
    children: any
}

export default class Page extends React.Component<PageProps, any> {
    constructor(props:PageProps){
        super(props);
    }
    render(){
        return (
            <div>
                <div>
                    <h1>Wanamu Page!!</h1>
                </div>
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
