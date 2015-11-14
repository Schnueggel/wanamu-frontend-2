import { BaseError } from  './BaseError';

export class UnauthorizedError extends BaseError {
    public name: string = 'UnauthorizedError';
    public message: string = 'You are not allowed to access the requested resources';
    public statusCode : number = 401;
}
