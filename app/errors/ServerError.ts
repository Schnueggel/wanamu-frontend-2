import BaseError = require('./BaseError');
/**
 * This Error normally should be thrown if the server respond with status code 500
 */
export class ServerError extends BaseError.BaseError {
    public name: string = 'ServerError';
    public message: string = 'The server response with an error';
}
