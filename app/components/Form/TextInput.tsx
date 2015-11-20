import * as React from 'react';
import InputElement = wu.Form.InputElement;

export default class TextInput extends React.Component<wu.Form.TextInputProps, any> {

    state: any = {
        value: ''
    };

    static defaultProps: wu.Form.TextInputProps = {
        errors: [],
        value: '',
        type: 'text',
        onBlur: () => {},
        onChange: () => {}
    };

    constructor(props:wu.Form.TextInputProps){
        super(props);

        if (!props.id){
            props.id = `generated-${new Date().getTime()}-${Math.floor(Math.random()*100000000)}`;
        }
    }

    handleChange(evt) {
        this.setState({
            value: evt.target.value
        });
        this.props.onChange(evt);
    }

    render() {
        let errs: JSX.Element[],
            label:JSX.Element;

        //Generate error elements
        errs = this.props.errors.map(this.createErrorElements);

        if (this.props.label) {
            label = <label className="mdl-textfield__label" for={this.props.id}>{this.props.label}</label>
        }

        return  (<div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input type={this.props.type} ref="field" className="mdl-textfield__input" value={this.state.value} id={this.props.id} onBlur={this.props.onBlur} onChange={this.handleChange.bind(this)}/>
            {label}
            {errs}
        </div>);
    }

    createErrorElements(text, key) {
        return <span className="mdl-textfield__error" key={key}>{text}</span>
    }
}
