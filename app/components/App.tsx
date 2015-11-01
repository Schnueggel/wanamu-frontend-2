import * as React from 'react';
import * as ReactDom from 'react-dom';

class App extends React.Component<Object, any> {
    constructor(props:Object){
        super(props);
    }
    render() {
        return (
            <div>Wanamu App!</div>
        );
    }
}

ReactDom.render(<App/>, document.getElementById('app'));