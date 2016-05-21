import {Login} from '../app/containers/Login';
const expect = require('expect');
import { App } from '../app/App';
import * as fetch from 'isomorphic-fetch';
import * as fetchMock from 'fetch-mock';
const TestUtils = require('react-addons-test-utils');
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import store from '../app/stores/appStore';
import * as Actions from '../app/actions/actions';
import config from '../app/config/routes';
import * as _ from 'lodash';

describe('Test', function () {

    store.getState().app.config = {
        WU_API_BASE_URL: 'http://localhost:9999'
    };

    fetchMock.mock('http://localhost:9999/user', 'GET', {
        body: {
            data: [{
                _id: '1',
                firstname: 'test',
                lastname: 'test',
                username: 'test'
            }]
        }
    });

    let app, login, dom;

    it('should load default user', (done) => {
        store.dispatch(Actions.loadDefaultUser()).then((response) => {
            expect(typeof response).toEqual('object');
            expect(response._id).toEqual('1');
            done();
        }).catch(done);
    });

    it('should show login', function () {
        store.getState().user.user = null;

        app = TestUtils.renderIntoDocument(
            <App path="/context.html"></App>
        );

        dom = ReactDOM.findDOMNode(app);
        login = TestUtils.findRenderedComponentWithType(app, Login);

        const submit = dom.querySelector('.login form button');
        const emailInp = dom.querySelector('.login input[name="email"]') as HTMLInputElement;
        const passwordInp = dom.querySelector('.login input[name="password"]') as HTMLInputElement;

        expect(dom.querySelector('.login h3').textContent).toEqual('Login');
        expect(emailInp.value).toEqual('');
        expect(passwordInp.value).toEqual('');
        expect(submit.getAttribute('disabled')).toEqual('');

        emailInp.value = 'test';
        TestUtils.Simulate.change(login.ctrls.form.ctrls.email.ctrls.field);
        passwordInp.value = 'test';
        TestUtils.Simulate.change(login.ctrls.form.ctrls.password.ctrls.field);

        expect(submit.getAttribute('disabled')).toEqual('');

        emailInp.value = 'test@test.de';
        TestUtils.Simulate.change(login.ctrls.form.ctrls.email.ctrls.field);
        expect(login.ctrls.form.ctrls.email.state.value).toEqual('test@test.de');

        passwordInp.value = 'test';
        TestUtils.Simulate.change(login.ctrls.form.ctrls.password.ctrls.field);
        expect(login.ctrls.form.ctrls.password.state.value).toEqual('test');

        expect(login.ctrls.form.ctrls.submit.ctrls.button.getAttribute('disabled')).toEqual(null);
    });

    it('should not login on 500', function(done) {
        fetchMock.mock('http://localhost:9999/auth/login', 'POST', {
            status: 500
        });

        expect(login.ctrls.form.ctrls.submit.ctrls.button.getAttribute('disabled')).toEqual(null);

        const unsubscribe = store.subscribe(() => {
            if (store.getState().login.error && store.getState().login.error === 'Please check your credentials') {
                expect(store.getState().login.error).toEqual('Please check your credentials');

                setTimeout(() => {
                    const errorMsg = TestUtils.findRenderedDOMComponentWithClass(login, 'error-message');
                    expect(errorMsg.textContent).toEqual('Please check your credentials');
                    done();
                    unsubscribe();
                }, 200);
            }
        });

        TestUtils.Simulate.click(login.ctrls.form.ctrls.submit.ctrls.button);
    });

    it('should not login on 403', function(done) {
        fetchMock.reMock('http://localhost:9999/auth/login', 'POST', {
            status: 403
        });

        expect(login.ctrls.form.ctrls.submit.ctrls.button.getAttribute('disabled')).toEqual(null);

        const unsubscribe = store.subscribe(()=> {
            if (store.getState().login.error) {
                expect(store.getState().login.error).toEqual('Please check your credentials');
                setTimeout(() => {
                    const errorMsg = TestUtils.findRenderedDOMComponentWithClass(login, 'error-message');
                    expect(errorMsg.textContent).toEqual('Please check your credentials');
                    done();
                    unsubscribe();
                }, 200);
            }
        });

        TestUtils.Simulate.click(login.ctrls.form.ctrls.submit.ctrls.button);

    });
});
