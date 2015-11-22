import * as React from 'react';

export default class TextInput extends React.Component<wu.Form.ITextInputProps, any> {

    state: any = {
        value: ''
    };

    refs: any = {
        field: HTMLInputElement
    };

    private defaultId: string;

    static defaultProps: wu.Form.ITextInputProps = {
        errors: [],
        value: '',
        type: 'text',
        className: '',
        onBlur: () => {},
        onChange: () => {}
    } as wu.Form.ITextInputProps;

    constructor(props:wu.Form.ITextInputProps){
        super(props);
        this.defaultId = `generated-${new Date().getTime()}-${Math.floor(Math.random()*100000000)}`;
        this.state.value = props.value;
    }

    handleChange(evt) {
        this.setState({
            value: evt.target.value
        });
        this.props.onChange(evt);
    }
    handeFieldOnFocus(evt) {
        evt.target.select();
    }

    render() {
        let errs: JSX.Element[],
            label:JSX.Element;
        const id = this.props.id ? this.props.id : this.defaultId;
        //Generate error elements
        errs = this.props.errors.map(this.createErrorElements);

        if (this.props.label) {
            label = <label className="mdl-textfield__label" htmlFor={id}>{this.props.label}</label>
        }

        return  (<div className={`mdl-textfield mdl-js-textfield ${this.props.className}`}>
            <input type={this.props.type} ref="field" className="mdl-textfield__input" value={this.state.value} id={id}
                   onBlur={this.props.onBlur} onChange={this.handleChange.bind(this)} onFocus={this.handeFieldOnFocus.bind(this)}/>
            {label}
            {errs}
        </div>);
    }

    createErrorElements(text, key) {
        return <span className="mdl-textfield__error" key={key}>{text}</span>
    }
}
