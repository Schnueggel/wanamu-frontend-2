import { BaseError } from  './BaseError';

export class PreConditionFailedError extends BaseError {
    public name: string = 'PreConditionFailedError';
    public message : string = 'The requested resource could not be found';
}
