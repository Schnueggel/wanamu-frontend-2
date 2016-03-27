const expect = require('expect');
import { App } from '../app/App';
const TestUtils = require('react-addons-test-utils');
import * as React from 'react';

describe('Test', function () {
    it('test', function () {
        const test = TestUtils.renderIntoDocument(
            <App></App>
        );

        expect(1).toEqual(1);
    });
});
