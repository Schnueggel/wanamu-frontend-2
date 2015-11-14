import { BaseError } from  './BaseError';

export class AccessError extends BaseError {
    public name: string = 'AccessError';
    public message: string = 'You are not allowed to access the requested resources';
}
