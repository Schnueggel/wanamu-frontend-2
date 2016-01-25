import * as React from 'react';
import * as _ from 'lodash';
import * as classNames from 'classnames';
import ITextInputProps = wu.Form.ITextInputProps;

interface IRef {
    field: HTMLInputElement,
    textbox: HTMLDivElement;
}

interface IState {
    valid: boolean,
    value: string
}

/**
 * @class TextInput
 * @namespace wu.components.Form
 */
export default class TextInput extends React.Component<ITextInputProps, IState> implements React.ComponentLifecycle<ITextInputProps, IState> {

    state: any = {
        value: '',
        valid: false
    };

    refs: IRef & any = {
        field  : null,
        textbox: null
    } as IRef;

    private defaultId: string;

    static defaultProps: ITextInputProps = {
        errors   : [],
        value    : '',
        type     : 'text',
        pattern  : /.*/,
        className: '',
        onBlur   : () => {},
        onChange : () => {}
    } as ITextInputProps;

    /**
     * @constructor
     * @param props
     */
    constructor(props: ITextInputProps) {
        super(props);
        this.defaultId   = `generated-${new Date().getTime()}-${Math.floor(Math.random() * 100000000)}`;
        this.state.value = props.value;
    }

    handleChange(evt) {
        const newState = {
            valid: this.props.pattern.test(evt.target.value),
            value: evt.target.value
        };

        this.setState(newState);

        this.props.onChange(newState);
    }

    handleFieldOnFocus(evt) {
        evt.target.select();
    }

    /**
     *
     * @param evt
     */
    handleBlur(evt) {
        this.props.onBlur(evt.target.value);
    }

    shouldComponentUpdate(nextProps: ITextInputProps, nextState: any) {
        return _.isEqual(nextState, this.state) === false || _.isEqual(nextProps, this.props) === false;
    }

    render() {
        const id   = this.props.id ? this.props.id : this.defaultId,
              errs = this.props.errors.map(this.createErrorElements);

        let className = classNames({
            [this.props.className]: true,
            'is-dirty'            : this.state.value ? true : false,
            'is-invalid'          : this.state.valid === false
        });

        const label = this.props.label ? <label className="wu-textfield__label" htmlFor={id}>{this.props.label}</label> : null;

        return (<div className={`wu-textfield wu-js-textfield ${className}`} ref="textbox">
            <input type={this.props.type} ref="field" className="wu-textfield__input" value={this.state.value} id={id}
                   onBlur={this.handleBlur.bind(this)} onChange={this.handleChange.bind(this)} onFocus={this.handleFieldOnFocus.bind(this)} noValidate name={this.props.name}/>
            {label}
            {errs}
        </div>);
    }

    createErrorElements(text, key) {
        return <span className="wu-textfield__error" key={key}>{text}</span>
    }
}
