declare module wu {

    module Form {
        interface IRadioButton extends IInputElementProps<IRadioButton> {
            label: string;
            checked?: boolean;
            value: string;
            id: string;
        }

        interface ISelectProps extends IInputElementProps<ITextInputProps> {
            pattern?: RegExp;
            options: Array<IOption>;
        }

        interface IOption {
            key: any;
            value: any;
        }

        interface ITextInputProps extends IInputElementProps<ITextInputProps> {
            pattern?: RegExp;
            type?: string;
        }

        interface ITextAreaProps extends IInputElementProps<ITextAreaProps> {
            rows?: number;
        }

        interface IInputElementProps<T> extends __React.Props<T> {
            value?: string;
            className?: string;
            label?: string;
            id?: string;
            name?: string;
            hide?: boolean;
            errors?: Array<string>;
            onChange?: (ev?:__React.FormEvent) => any;
            onBlur?: (ev?:__React.FormEvent) => any;
        }
    }
}