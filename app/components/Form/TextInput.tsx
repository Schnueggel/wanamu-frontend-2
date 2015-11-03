import * as React from 'react';
import InputElement = wu.Form.InputElement;

export default class TextInput extends React.Component<wu.Form.TextInputProps, any> {

    isValid: boolean = false;

    state:any = {
        errors: this.props.errors
    };

    static defaultProps: any = {
        errors: [],
        validators: [],
        value: '',
        type: 'text'
    };

    constructor(props:wu.Form.TextInputProps){
        super(props);
    }

    handleBlur() {
        this.validate();
    }

    handleChange(evt) {
        this.setState({
            value: evt.target.value
        });
        this.validate();
    }

    validate() {
        this.state.errors = this.props.validators
            .filter((validator: wu.Form.Validator) => (this.refs['field'] as InputElement).value.match(validator.regex) === null)
            .map((validator: wu.Form.Validator) => validator.text);

        this.isValid = this.state.errors.length === 0;
    }

    render() {
        let errs: JSX.Element[], label:JSX.Element;

        errs = this.state.errors.map((v: string, i) => <p className="form-error" key={i}>{v}</p>);

        if (this.props.label) {
            label = <label className="form-label">{this.props.label}</label>
        }

        return  <div className="form-control-group">
            {label}
            <input type={this.props.type} ref="field" className="form-control" value={this.state.value} onBlur={this.handleBlur.bind(this)} onChange={this.handleChange.bind(this)}/>
            <div className="form-errors">
                {errs}
            </div>
        </div>
    }
}
