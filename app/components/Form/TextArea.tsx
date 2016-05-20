import * as React from 'react';
import * as classNames from 'classnames';

export default class TextArea extends React.Component<wu.Form.ITextAreaProps, any> {

    state: any = {
        value: ''
    };

    ctrls: {
        text?: HTMLDivElement,
        field?: HTMLTextAreaElement
    } = {};

    id: string;

    static defaultProps: wu.Form.ITextAreaProps = {
        errors: [],
        value: '',
        rows: 3,
        placeholder: '',
        className: '',
        onBlur: () => {},
        onChange: () => {}
    } as wu.Form.ITextAreaProps;

    constructor(props:wu.Form.ITextAreaProps){
        super(props);

        if (!props.id) {
            this.id = `generated-${new Date().getTime()}-${Math.floor(Math.random()*100000000)}`;
        } else {
            this.id = props.id;
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
            label = <label className="wu-textfield__label" htmlFor={this.props.id}>{this.props.label}</label>
        }
        const textContainerClass = classNames({
            'wu-textfield': true,
            'wu-js-textfield': true,
            [this.props.className]: true
        });

        return (<div className={textContainerClass} ref={c => this.ctrls.text = c}>
            {label}
            <textarea className="wu-textfield__input" rows={this.props.rows} ref={c => this.ctrls.field = c} id={this.id} value={this.state.value}
                      onBlur={this.props.onBlur} onChange={this.handleChange.bind(this)} placeholder={this.props.placeholder}>
            </textarea>
            {errs}
        </div>);
    }

    createErrorElements(text, key) {
        return <span className="wu-textfield__error" key={key}>{text}</span>
    }
}
