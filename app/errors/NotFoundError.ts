import { BaseError } from  './BaseError';

export class NotFoundError extends BaseError {
    public name: string = 'NotFoundError';
    public message : string = 'The requested resource could not be found';
}
