import * as React from 'react';
import * as _ from 'lodash';
import { Subject, Observable } from 'rx';

import ISelectProps = wu.Form.ISelectProps;
import IOption = wu.Form.IOption;

interface IRef {
    field: HTMLInputElement
}

interface IState {
    valid: boolean;
    value: string;
}

/**
 * @class TextInput
 * @namespace wu.components.Form
 */
export class Select extends React.Component<ISelectProps, IState> {

    state: any = {
        value: ''
    };

    refs: IRef & any = {
        field  : null,
        textbox: null
    } as IRef;

    private defaultId: string;

    public stateStream: Observable<IState>;

    private startStream: Subject<IState>;

    static defaultProps: ISelectProps = {
        errors   : [],
        value    : '',
        pattern  : /.*/,
        options  : [],
        className: '',
        onBlur   : () => {},
        onChange : () => {}
    } as ISelectProps;

    /**
     * @constructor
     * @param props
     */
    constructor(props: ISelectProps) {
        super(props);
        this.defaultId   = `generated-${new Date().getTime()}-${Math.floor(Math.random() * 100000000)}`;
        this.state.value = props.value;

        this.startStream = new Subject<any>();
        this.stateStream = this.startStream.map((evt: any) => {
                const newState = {
                    valid: this.props.pattern.test(evt.target.value),
                    value: evt.target.value
                };
                this.setState(newState);
                return newState;
            })
            .publish()
            .refCount();
    }

    handleChange(evt) {
        this.startStream.onNext(evt);
        this.props.onChange(evt);
    }

    shouldComponentUpdate(nextProps: ISelectProps, nextState: any) {
        return _.isEqual(nextState, this.state) === false || _.isEqual(nextProps, this.props) === false;
    }

    render() {
        const id   = this.props.id ? this.props.id : this.defaultId,
              errs = this.props.errors.map(this.createErrorElements);

        let className = this.props.className;

        if (this.state.value) {
            className += ' is-dirty';
        }

        if (this.state.valid === false) {
            className += ' is-invalid';
        }

        const options = this.props.options.map(this.createOptions.bind(this));

        const label = this.props.label ? <label className="wu-textfield__label" htmlFor={id}></label> : null;

        return (<div className={`wu-select wu-textfield wu-js-textfield ${className}`} ref="textbox">
                <select ref="field" className="wu-textfield__input" value={this.state.value} id={id}
                        onBlur={this.props.onBlur} onChange={this.handleChange.bind(this)} noValidate name={this.props.name}>
                    {options}
                </select>
            {label}
            {errs}
        </div>);
    }

    createErrorElements(text, key) {
        return <span className="wu-textfield__error" key={key}>{text}</span>
    }

    createOptions({key, value}) {
        return <option key={key} value={key}>{value}</option>;
    }
}
