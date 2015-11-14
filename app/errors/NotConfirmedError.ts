import { BaseError } from  './BaseError';

export class NotConfirmedError extends BaseError {
    public name: string = 'NotConfirmedError';
    public message : string = 'Not confirmed';
}
