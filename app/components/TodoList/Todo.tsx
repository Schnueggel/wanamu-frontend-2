import * as React from 'react';
import * as Rx from 'rx';
import TextInput from 'components/Form/TextInput';
import IconButton from 'components/Elements/IconButton';

export interface ITodoProps extends __React.Props<ITodoProps> {
    todo: wu.model.data.ITodo;
}

export interface ITodoState {
    edit?: boolean;
    colorPick?: boolean;
    color?: string;
}

export default class Todo extends React.Component<ITodoProps, ITodoState> {

    state: ITodoState = {
        edit: false,
        colorPick: false,
        color: Todo.colors.color1
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

    constructor(props:ITodoProps){
        super(props);
    }

    handleTitleOnClick() {
        this.setState({
            edit: true
        });
    }

    refTitleInput(input: TextInput) {
        if (input) {
            input.refs.field.focus();
            input.refs.field.select();
        }
    }

    handleTextOnBlur() {
        this.setState({
            edit: false
        });
    }

    handleColorPick() {
        this.setState({
            colorPick: this.state.colorPick === false
        });
    }

    pickColor(color) {
        this.props.todo.color = color;
        this.setState({color});
    }

    render() {
        const titleHidden = this.state.edit ? 'hidden' : '',
            descriptionHidden = this.props.todo.description ? '' : 'hidden',
            color = this.props.todo.color ? this.props.todo.color : Todo.colors.color1,
            colorPickHidden = this.state.colorPick ? '' : 'hidden';

        return  (<div className={`todo mdl-card mdl-shadow--2dp`}>
            <div className={`mdl-card__title mdl-card--expand ${color}`}>
                <h3 className={`${titleHidden}`}  onClick={this.handleTitleOnClick.bind(this)}>
                    {this.props.todo.title}
                </h3>
                { this.state.edit ?
                <TextInput value={this.props.todo.title} ref={this.refTitleInput.bind(this)}
                           onBlur={this.handleTextOnBlur.bind(this)}/>: null}
            </div>
            <div className={`mdl-card__supporting-text ${descriptionHidden}`}>
                {this.props.todo.description}
            </div>
            <div className="mdl-card__menu">
                <IconButton icon="color_lens" onClick={this.handleColorPick.bind(this)} />
            </div>
            <div className={`colorpicker mdl-card__actions mdl-card--border ${colorPickHidden}`}>
                {this.getColorPickButtons()}
            </div>
        </div>);
    }

    getColorPickButtons() {
        return Object.keys(Todo.colors).map((color) => {
            return <IconButton icon="lens" onClick={() => this.pickColor(color)} className={color} disabled={this.props.todo.color === color}/>
        });
    }
}
