declare module wu {

    module Form {
        interface Validator {
            regex: RegExp;
            text: string;
        }
        interface TextInputProps extends __React.Props<TextInputProps>{
            type?: string;
            value?: string;
            label?: string;
            errors?: Array<string>;
            onChange?: (ev?:__React.FormEvent) => any,
            onBlur?: (ev?:__React.FormEvent) => any,
        }

        interface InputElement extends __React.Component<any,any> {
            value: string;
        }
    }
}