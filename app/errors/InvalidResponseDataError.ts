import BaseError = require('./BaseError');

export class InvalidResponseDataError extends BaseError.BaseError {
    public name: string = 'InvalidResponseDataError';
    public message: string = 'The server response is invalid';

    constructor(message?: string) {
        super(message);
    }
}
