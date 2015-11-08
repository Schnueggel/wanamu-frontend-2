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
            label = <label className="form-label">{this.props.label}</label>
        }

        return  <div className="form-control-group">
            {label}
            <input type={this.props.type} ref="field" className="form-control" value={this.state.value} onBlur={this.props.onBlur} onChange={this.handleChange.bind(this)}/>
            <div className="form-errors">
                {errs}
            </div>
        </div>
    }

    createErrorElements(text, key) {
        return <p className="form-error" key={key}>{text}</p>
    }
}
