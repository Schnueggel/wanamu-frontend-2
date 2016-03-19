import * as React from 'react';
import * as _ from 'lodash';
import {TextInput} from 'components/Form/TextInput';
import {IconButton} from 'components/Elements/IconButton';
import TextArea from 'components/Form/TextArea';
import * as classNames from 'classnames';
import ITodo = wu.model.data.ITodo;

export interface ITodoProps extends __React.Props<ITodoProps> {
    todo: ITodo;
    onTodoChange?(todo: ITodo): void;
    onTodoDelete?(todo: ITodo): void;
    onTodoFinish?(todo: ITodo): void;
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
export default class Todo extends React.Component<ITodoProps, ITodoState> implements React.ComponentLifecycle<ITodoProps, ITodoState> {

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

    static defaultProps: ITodoProps = {
        todo: null,
        onTodoChange: (todo: ITodo) => {},
        onTodoDelete: (todo: ITodo) => {},
        onTodoFinish: (todo: ITodo) => {}
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
     * @param nextState
     */
    shouldComponentUpdate(nextProps: ITodoProps, nextState: ITodoState) {
        return nextProps.todo !== this.todo || _.isEqual(this.state, nextState) === false;
    }

    handleTextOnBlur(value) {
        this.setState({
            editTitle: false
        });
        if (value !== this.todo.title) {
            this.todo.title = value;
            this.triggerTodoChanged(this.todo);
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
        this.todo.description = evt.target.value;
        this.triggerTodoChanged(this.todo);
        this.setState({
            editDescription: false
        });
    }

    handleDone(evt) {
        this.todo.finished = this.todo.finished === false;
        if (this.todo.finished) {
            this.props.onTodoFinish(this.todo);
        } else {
            this.triggerTodoChanged(this.todo);
        }
    }

    handleDelete() {
        this.props.onTodoDelete(this.todo);
    }

    pickColor(color) {
        if (color === this.todo.color) {
            return;
        }
        this.todo.color = color;
        this.triggerTodoChanged(this.todo);
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
            descriptionHideClass = this.state.editDescription || this.todo.description ? '' : 'hidden',
            colorPickHidden = this.state.colorPick ? '' : 'hidden';

        const descriptionTextClass = classNames({
            hidden: this.state.editDescription
        });
        const descriptionFieldClass = classNames({
            hidden: this.state.editDescription === false
        });

        const doneIcon = this.todo.finished ? 'undo' : 'done';

        return  (<div className={`todo`}>
            <div className={`todo__title ${color}`}>
                <TextInput value={this.todo.title} onBlur={this.handleTextOnBlur.bind(this)} label="Todo text"/>
            </div>
            <div className={`todo__supporting-text ${descriptionHideClass}`}>
                <div className={descriptionTextClass} onClick={this.handleEditDescription.bind(this)}>{this.todo.description}</div>
                <TextArea className={descriptionFieldClass} value={this.todo.description} placeholder="Description" rows={3} onBlur={this.handleDescriptionBlur.bind(this)} ref="description"/>
            </div>
            <div className="todo__menu">
                <IconButton icon={doneIcon} onClick={this.handleDone.bind(this)}/>
                <IconButton icon="delete" onClick={this.handleDelete.bind(this)} />
                <span className="spacer"/>
                <IconButton icon="color_lens" onClick={this.handleColorPick.bind(this)} />
            </div>
            <div className={`colorpicker todo__actions ${colorPickHidden}`}>
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
