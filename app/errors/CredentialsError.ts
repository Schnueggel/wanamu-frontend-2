'use strict';

import {BaseError} from './BaseError';

export class CredentialsError extends BaseError {
    public name: string = 'CredentialsError';
    public message: string = 'Wrong credentials';
}
