import { BaseError } from  './BaseError';

export class TimeoutError extends BaseError {
    public name: string = 'TimeoutError';
    public message : string = 'TimeoutError. Server didnt respond in time. Please check your network';
}
