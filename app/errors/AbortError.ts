import { BaseError } from  './BaseError';

export class AbortError extends BaseError {
    public name: string = 'AbortError';
    public message: string = 'Action was aborted';
}
