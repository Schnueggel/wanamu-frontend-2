declare module wu {

    module Form {
        interface Validator {
            regex: RegExp;
            text: string;
        }

        interface IRadioButton extends IInputElementProps<IRadioButton> {
            label: string;
            checked?: boolean;
            value: string;
            id: string;
        }

        interface ITextInputProps extends IInputElementProps<ITextInputProps> {
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
            hide?: boolean;
            name?: string;
            errors?: Array<string>;
            onChange?: (ev?:__React.FormEvent) => any;
            onBlur?: (ev?:__React.FormEvent) => any;
        }
    }
}