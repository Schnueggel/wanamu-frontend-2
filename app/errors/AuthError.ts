import { BaseError }from './BaseError';

export class AuthError extends BaseError {
    public name: string = 'AuthError';
    public message: string  = 'You need to authenticate';
}
