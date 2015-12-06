export class BaseError extends Error {
    public name: string = 'BaseError';
    public defaultMessage = null;

    constructor(message?: string) {
        super(message);

        this.message = message;

        if (!message && this.defaultMessage) {
            this.message = this.defaultMessage;
        }
    }

    toString() {
        return this.name + ': ' + this.message;
    }
}
