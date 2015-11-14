/**
 * Created by Christian on 06.06.2015.
 */
'use strict';

import BaseError = require('./BaseError');

export class InvalidResponseDataError extends BaseError.BaseError {
    public name: string = 'InvalidResponseDataError';
    public message: string = 'The server response is invalid';
}
