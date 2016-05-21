import * as React from 'react';
import * as _ from 'lodash';
import {TextInput} from 'components/Form/TextInput';
import {IconButton} from 'components/Elements/IconButton';
import TextArea from 'components/Form/TextArea';
import * as classNames from 'classnames';
import ITodo = wu.model.data.ITodo;
import ITodoView = wu.model.view.ITodoView;
import * as ReactDOM from 'react-dom';

export interface ITodoProps extends __React.Props<ITodoProps> {
    onTodoChange?(todo: ITodoView): void;
    onTodoDelete?(todo: ITodoView): void;
    onTodoFinish?(todo: ITodoView): void;
    onTodoViewChange?(todo: ITodoView): void;
    todo: ITodoView
}


/**
 * @class Todo
 * @namespace wu.components.TodoList
 */
export default class Todo extends React.Component<ITodoProps, any> implements React.ComponentLifecycle<ITodoProps, any> {

    ctrls: {
        description?: TextArea
        title?: TextInput
    } = {};

    static colors = {
        color1: 'color1',
        color2: 'color2',
        color3: 'color3',
        color4: 'color4',
        color5: 'color5'
    };

    static defaultProps: ITodoProps = {
        todo: null,
        onTodoChange: (todo: ITodoView) => {},
        onTodoDelete: (todo: ITodoView) => {},
        onTodoFinish: (todo: ITodoView) => {},
        onTodoViewChange: (todo: ITodoView) => {},
    } as ITodoProps;

    /**
     *
     * @param props
     */
    constructor(props:ITodoProps){
        super(props);
    }

    /**
     * React lifecycle
     * @param nextProps
     */
    componentWillUpdate(nextProps: ITodoProps) {}

    componentDidMount() {
        this.checkInputFocus();
    }

    componentDidUpdate() {
        this.checkInputFocus();
    }

    /**
     * React lifecycle
     * @param nextProps
     * @param nextState
     */
    shouldComponentUpdate(nextProps: ITodoProps, nextState: any) {
        return nextProps.todo !== this.props.todo;
    }

    handleTextOnBlur(value) {
        this.props.todo.editTitle = false;
        this.props.onTodoViewChange(this.props.todo);

        if (value !== this.props.todo.title) {
            this.props.todo.title = value;
            this.triggerTodoChanged(this.props.todo);
        }
    }

    handleColorPick() {
        _.assign(this.props.todo, { editColor: this.props.todo.editColor === false, editTitle: false, editDescription: false });

        this.props.onTodoViewChange(this.props.todo);
    }

    /**
     *
     * @param open Set open to control edit of description else toggle will happen
     */
    handleEditDescription(open?:boolean) {
        let edit = this.props.todo.editDescription === false;

        if (_.isBoolean(open)) {
            edit = open;
        }

        _.assign(this.props.todo, { editColor: false, editTitle: false, editDescription: edit });

        this.props.onTodoViewChange(this.props.todo);
    }

    handleDescriptionBlur(evt) {
        this.props.todo.description = evt.target.value;
        this.props.todo.editDescription = false;

        this.props.onTodoViewChange(this.props.todo);
        this.triggerTodoChanged(this.props.todo);
    }

    handleDone() {
        this.props.todo.finished = this.props.todo.finished === false;
        if (this.props.todo.finished) {
            this.props.onTodoFinish(this.props.todo);
        } else {
            this.triggerTodoChanged(this.props.todo);
        }
    }

    handleDelete() {
        this.props.onTodoDelete(this.props.todo);
    }

    pickColor(color) {
        if (color === this.props.todo.color) {
            return;
        }
        this.props.todo.color = color;
        this.triggerTodoChanged(this.props.todo);
        _.assign(this.props.todo, { editColor: false, editTitle: false, editDescription: false });

        this.props.onTodoViewChange(this.props.todo);
    }

    triggerTodoChanged(todo?: any) {
        this.props.onTodoChange(todo);
    }

    checkInputFocus() {
        if (this.props.todo.editDescription) {
            (ReactDOM.findDOMNode(this.ctrls.description.ctrls.field) as HTMLInputElement).focus();
        } else if (this.props.todo.editTitle) {
            (ReactDOM.findDOMNode(this.ctrls.title.ctrls.field) as HTMLInputElement).focus();
        }
    }

    /**
     * React lifecycle
     * @returns {any}
     */
    render() {
        const todo = this.props.todo;
        const color = todo.color ? todo.color : Todo.colors.color1,
            colorPickHidden = todo.editColor ? '' : 'hidden';

        const descriptionTextClass = classNames({
            hidden: todo.editDescription
        });
        const descriptionFieldClass = classNames({
            hidden: todo.editDescription === false
        });

        const doneIcon = todo.finished ? 'undo' : 'done';

        return  (<div className={`todo`}>
            <div className={`todo__title ${color}`}>
                <TextInput value={todo.title} onBlur={this.handleTextOnBlur.bind(this)} label="Todo text" ref={c => this.ctrls.title = c}/>
            </div>
            <div className={`todo__supporting-text`} onClick={this.handleEditDescription.bind(this)}>
                <div className={descriptionTextClass}>{todo.description || 'Description'}</div>
                <TextArea className={descriptionFieldClass} value={todo.description} placeholder="Description" rows={3}
                          onBlur={this.handleDescriptionBlur.bind(this)} ref={c => this.ctrls.description = c}/>
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
            return <IconButton icon="lens" onClick={() => this.pickColor(color)} className={color} disabled={this.props.todo.color === color} key={color}/>
        });
    }
}
