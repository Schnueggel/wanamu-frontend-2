
declare class Error {
    public name: string;
    public message: string;
    public stack: string;
    constructor(message?: string);
}

export class BaseError extends Error {
    public name: string = 'BaseError';

    constructor(public message?: string) {
        super(message);
        if (message !== undefined) {
            this.message = message;
        }
        this.stack = (<any>new Error()).stack;
    }
    toString() {
        return this.name + ': ' + this.message;
    }
}
