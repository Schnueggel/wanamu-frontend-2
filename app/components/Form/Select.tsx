import * as React from 'react';
import * as _ from 'lodash';
import * as classNames from 'classnames';

import ISelectProps = wu.Form.ISelectProps;
import IOption = wu.Form.IOption;

export interface IState {
    valid: boolean;
    value: string;
}

/**
 * @class Select
 * @memberOf wu.components.Form
 */
export class Select extends React.Component<ISelectProps, IState> {

    state: any = {
        value: ''
    };

    ctrls: any = {
        select  : HTMLSelectElement
    } = {} as any;

    private defaultId: string;

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
    }

    handleChange(evt) {
        const state = {
            valid: true,
            value: evt.target.value
        };

        this.setState(state);
        this.props.onChange(state);
    }

    shouldComponentUpdate(nextProps: ISelectProps, nextState: any) {
        return _.isEqual(nextState, this.state) === false || _.isEqual(nextProps, this.props) === false;
    }

    render() {
        const id      = this.props.id ? this.props.id : this.defaultId,
              errs    = this.props.errors.map(createErrorElements),
              options = this.props.options.map(createOptions),
              label   = this.props.label ? <label className="wu-textfield__label" htmlFor={id}/> : null;

        const className = classNames({
            [this.props.className]: true,
            'is-dirty'            : this.state.value ? true : false,
            'is-invalid'          : this.state.valid === false
        });

        return (<div className={`wu-select wu-textfield wu-js-textfield ${className}`}>
            <select ref={ c => this.ctrls.select = c} className="wu-textfield__input" value={this.state.value} id={id}
                    onBlur={this.props.onBlur} onChange={this.handleChange.bind(this)} noValidate name={this.props.name}>
                {options}
            </select>
            {label}
            {errs}
        </div>);
    }
}

function createOptions({key, value}) {
    return <option key={key} value={key}>{value}</option>;
}

function createErrorElements(text, key) {
    return <span className="wu-textfield__error" key={key}>{text}</span>
}
