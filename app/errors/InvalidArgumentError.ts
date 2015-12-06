import { BaseError } from  './BaseError';

export class InvalidArgumentError extends BaseError {
    public name: string = 'InvalidArgumentError';

    constructor(message?: string) {
        super(message);
    }
}
