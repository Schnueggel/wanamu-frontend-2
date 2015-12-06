import { BaseError } from  './BaseError';

export class UnknownError extends BaseError {
    name: string = 'UnkownError';
    defaultMessage: string = 'An undefined error happend';

    constructor(message?: string) {
        super(message);
    }
}
