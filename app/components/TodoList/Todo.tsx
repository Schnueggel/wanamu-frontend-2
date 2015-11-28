import * as React from 'react';
import * as _ from 'lodash';
import TextInput from 'components/Form/TextInput';
import IconButton from 'components/Elements/IconButton';
import TextArea from 'components/Form/TextArea';

export interface ITodoProps extends __React.Props<ITodoProps> {
    todo: wu.model.data.ITodo;
    onTodoChange?(todo: wu.model.data.ITodo): void;
}

export interface ITodoState {
    editTitle?: boolean;
    colorPick?: boolean;
    color?: string;
    editDescription?: boolean;
}

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

    static propTypes: any = {
        todo: React.PropTypes.object.isRequired
    };

    static defaultProps: ITodoProps = {
        todo: null,
        onTodoChange(todo: wu.model.data.ITodo):void {},
    } as ITodoProps;

    constructor(props:ITodoProps){
        super(props);
    }

    handleTextOnBlur(evt) {
        this.setState({
            editTitle: false
        });
        this.props.todo.title = evt.target.value;
        this.triggerTodoChanged();
    }

    handleColorPick() {
        this.setState({
            colorPick: this.state.colorPick === false
        });
    }

    handleEditDescription() {
        this.setState({
            colorPick: false,
            editDescription: this.state.editDescription === false
        });
    }

    handleDescriptionBlur(evt) {
        this.props.todo.description = evt.target.value;
        this.triggerTodoChanged();
    }

    pickColor(color) {
        this.props.todo.color = color;
        this.triggerTodoChanged();
        this.setState({
            color,
            colorPick: false
        });
    }

    triggerTodoChanged() {
        if (this.props.todo.dirty) {
            this.props.onTodoChange(this.props.todo);
        }
    }

    render() {
        let description;
        const color = this.props.todo.color ? this.props.todo.color : Todo.colors.color1,
            descriptionClass = this.state.editDescription || this.props.todo.description ? 'mdl-card__supporting-text' : 'mdl-card__supporting-text hidden',
            descriptionTextClass = this.state.editDescription ? '' : 'hidden',
            colorPickHidden = this.state.colorPick ? '' : 'hidden';

        return  (<div className={`todo mdl-card mdl-shadow--2dp`}>
            <div className={`mdl-card__title mdl-card--expand ${color}`}>
                <TextInput value={this.props.todo.title}
                           onBlur={this.handleTextOnBlur.bind(this)} label="Todo text"/>
            </div>
            <div className={descriptionClass}>
                { this.state.editDescription ? null :<span>{this.props.todo.description}</span> }
                <TextArea value={this.props.todo.description} label="Description" onBlur={this.handleDescriptionBlur.bind(this)} ref="description" className={descriptionTextClass} />
            </div>
            <div className="mdl-card__menu">
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
            return <IconButton icon="lens" onClick={() => this.pickColor(color)} className={color} disabled={this.props.todo.color === color} key={color}/>
        });
    }
}
