declare module wu {
    module Form {
        interface Validator {
            regex: RegExp;
            text: string;
        }
        interface TextInputProps {
            type?: string;
            value?: string;
            label?: string;
            errors?: Array<string>;
            validators?: Array<Validator>
        }

        interface InputElement extends Element {
            value: string;
        }
    }
}