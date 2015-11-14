import * as React from 'react';
import * as Rx from 'rx';

export interface TodoProps extends __React.Props<TodoProps> {
    todo: wu.model.data.ITodo
}

export default class Todo extends React.Component<TodoProps, any> {

    refs: any = {
    };

    static propTypes: any = {
        todo: React.PropTypes.object.isRequired
    };

    state:any = {
        todo: {}
    };

    constructor(props:TodoProps){
        super(props);
    }

    render() {
        return  <li>
            {this.props.todo.description}
        </li>
    }

}
