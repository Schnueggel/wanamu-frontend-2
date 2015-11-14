import { BaseError } from  './BaseError';

export class NetworkError extends BaseError {
    public name: string = 'NetworkError';
    public message : string = 'Network problems';
}
