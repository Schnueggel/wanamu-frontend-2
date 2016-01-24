import * as React from 'react';

export default class RadioButton extends React.Component<wu.Form.IRadioButton, any> {

    state: any = {
        value: '',
        checked: false
    };

    refs: any = {
        field: HTMLInputElement
    };

    private defaultId: string;

    static defaultProps: wu.Form.IRadioButton = {
        errors: [],
        value: '1',
        type: 'text',
        className: '',
        label: '',
        id: 'radio',
        checked: false,
        onBlur: () => {},
        onChange: () => {}
    } as any;

    constructor(props:wu.Form.IRadioButton){
        super(props);
        this.state.value = props.value;
        this.state.checked = props.checked === true;
    }

    handleChange(evt) {
        this.props.onChange(evt);
    }

    render() {
        //Generate error elements
        const errs:any = this.props.errors.map(this.createErrorElements);

        return  (<label className="radio__container" htmlFor={this.props.id}>
                <input type="radio" id={this.props.id} className="radio" name={this.props.name} value={this.props.value} checked={this.props.checked} onChange={this.handleChange.bind(this)} ref="field" />
                <span className="label">{this.props.label}</span>
                    {errs}
            </label>);
    }

    createErrorElements(text, key) {
        return <span className="textfield__error" key={key}>{text}</span>
    }
}
