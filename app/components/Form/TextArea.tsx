import * as React from 'react';

export default class TextArea extends React.Component<wu.Form.ITextAreaProps, any> {

    state: any = {
        value: ''
    };

    refs: any = {
        text: HTMLDivElement,
        field: HTMLInputElement
    };

    static defaultProps: wu.Form.ITextAreaProps = {
        errors: [],
        value: '',
        rows: 3,
        className: '',
        hide: false,
        onBlur: () => {},
        onChange: () => {}
    } as wu.Form.ITextAreaProps;

    constructor(props:wu.Form.ITextAreaProps){
        super(props);

        if (!props.id){
            props.id = `generated-${new Date().getTime()}-${Math.floor(Math.random()*100000000)}`;
        }
        this.state.value = props.value;
    }

    handleChange(evt) {
        this.setState({
            value: evt.target.value
        });
        this.props.onChange(evt);
    }

    render() {
        let label:JSX.Element;

        //Generate error elements
        const errs:any = this.props.errors.map(this.createErrorElements);

        if (this.props.label) {
            label = <label className="mdl-textfield__label" htmlFor={this.props.id}>{this.props.label}</label>
        }

        return (<div class="mdl-textfield mdl-js-textfield" is ref="text" hide={this.props.hide}>
            <textarea className="mdl-textfield__input" rows={this.props.rows} ref="field" id={this.props.id}  value={this.state.value}
                      onBlur={this.props.onBlur} onChange={this.handleChange.bind(this)}>
            </textarea>
            {label}
            {errs}
        </div>);
    }

    createErrorElements(text, key) {
        return <span className="mdl-textfield__error" key={key}>{text}</span>
    }
}
