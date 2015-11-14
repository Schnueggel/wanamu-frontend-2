import { BaseError } from  './BaseError';

export class AlreadyConfirmedError extends BaseError {
    public name: string = 'AlreadyConfirmedError';
    public message : string = 'Already confirmed';
}
