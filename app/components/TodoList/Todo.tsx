import * as React from 'react';
import * as _ from 'lodash';
import TextInput from 'components/Form/TextInput';
import IconButton from 'components/Elements/IconButton';
import TextArea from 'components/Form/TextArea';

import ITodo = wu.model.data.ITodo;

export interface ITodoProps extends __React.Props<ITodoProps> {
    todo: ITodo;
    onTodoChange?(todo: ITodo): void;
}

export interface ITodoState {
    editTitle?: boolean;
    colorPick?: boolean;
    color?: string;
    editDescription?: boolean;
}

/**
 * @class Todo
 * @namespace wu.components.TodoList
 */
export default class Todo extends React.Component<ITodoProps, ITodoState> {

    state: ITodoState = {
        editTitle: false,
        colorPick: false,
        color: Todo.colors.color1,
        editDescription: false
    };

    refs: any = {
        description: TextArea
    };

    static colors = {
        color1: 'color1',
        color2: 'color2',
        color3: 'color3',
        color4: 'color4',
        color5: 'color5'
    };

    todo: ITodo;

    static propTypes: any = {
        todo: React.PropTypes.object.isRequired
    };

    static defaultProps: ITodoProps = {
        todo: null,
        onTodoChange(todo: ITodo):void {},
    } as ITodoProps;

    /**
     *
     * @param props
     */
    constructor(props:ITodoProps){
        super(props);
        this.todo = props.todo;
    }

    /**
     * React lifecycle
     * @param nextProps
     */
    componentWillUpdate(nextProps: ITodoProps) {
        this.todo = nextProps.todo;
    }

    /**
     * React lifecycle
     * @param nextProps
     */
    shouldComponentUpdate(nextProps: ITodoProps, nextState: ITodoState) {
        return nextProps.todo !== this.todo || _.isEqual(this.state, nextState) === false;
    }

    handleTextOnBlur(evt) {
        this.setState({
            editTitle: false
        });
        if (evt.target.value !== this.todo.title) {
            this.triggerTodoChanged(this.todo.set('title', evt.target.value));
        }
    }

    handleColorPick() {
        this.setState({
            editDescription: false,
            colorPick: this.state.colorPick === false
        });
    }

    handleEditDescription(open?:boolean) {
        let edit = this.state.editDescription === false;

        if (_.isBoolean(open)) {
            edit = open;
        }

        this.setState({
            colorPick: false,
            editDescription: edit
        });

        if (edit){
            setTimeout(() => {
                this.refs.description.refs.field.focus();
            }, 400);
        }
    }

    handleDescriptionBlur(evt) {
        this.triggerTodoChanged(this.todo.set('description', evt.target.value));
    }

    handleDone(evt) {
        this.triggerTodoChanged(this.todo.set('finished', true));
    }

    pickColor(color) {
        if (color === this.todo.color) {
            return;
        }
        this.triggerTodoChanged(this.todo.set('color', color));
        this.setState({
            color,
            colorPick: false
        });
    }

    triggerTodoChanged(todo?: any) {
        this.props.onTodoChange(todo);
    }

    /**
     * React lifecycle
     * @returns {any}
     */
    render() {
        const color = this.todo.color ? this.todo.color : Todo.colors.color1,
            descriptionHide = this.state.editDescription || this.todo.description ? false : true,
            colorPickHidden = this.state.colorPick ? '' : 'hidden';

        return  (<div className={`todo mdl-card mdl-shadow--2dp`}>
            <div className={`mdl-card__title mdl-card--expand ${color}`}>
                <TextInput value={this.todo.title} onBlur={this.handleTextOnBlur.bind(this)} label="Todo text"/>
            </div>
            <div class="mdl-card__supporting-text" is="true" hide={descriptionHide}>
                { this.state.editDescription ? null :<div onClick={this.handleEditDescription.bind(this)} hide={this.state.editDescription} >{this.todo.description}</div> }
                <TextArea value={this.todo.description} label="Description" rows={3} onBlur={this.handleDescriptionBlur.bind(this)} ref="description" hide={!this.state.editDescription} />
            </div>
            <div className="mdl-card__menu">
                <IconButton icon="done" onClick={this.handleDone.bind(this)} />
                <span className="mdl-layout-spacer"/>
                <IconButton icon="subject" onClick={this.handleEditDescription.bind(this)} />
                <IconButton icon="color_lens" onClick={this.handleColorPick.bind(this)} />
            </div>
            <div className={`colorpicker mdl-card__actions mdl-card--border ${colorPickHidden}`}>
                {this.createColorPickButtons()}
            </div>
        </div>);
    }

    createColorPickButtons() {
        return Object.keys(Todo.colors).map((color) => {
            return <IconButton icon="lens" onClick={() => this.pickColor(color)} className={color} disabled={this.todo.color === color} key={color}/>
        });
    }
}
