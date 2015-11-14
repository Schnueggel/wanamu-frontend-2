/**
 * Created by Christian on 06.06.2015.
 */
'use strict';

import BaseError = require('./BaseError');

export class InvalidArgumentError extends BaseError.BaseError {
    public name: string = 'InvalidArgumentError';
}
