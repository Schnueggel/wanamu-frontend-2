export * from './BootstrapActions';
export * from './TodoListAction';
export * from './LoginActions';
export * from './LogoutActions';
export * from './UserActions';
export * from './ConfigActions';
export * from './TokenActions';
export * from './AppAction';
export * from './RegisterActions';
export * from './TodoActions';

import { routerActions } from 'react-router-redux';

/**
 *
 * @param response
 * @param dispatch
 */
export function responseStatusCheck(response: Response, dispatch) {
    if (response.status === 400) {
        throw new Error('Invalid Request');
    } else if (response.status === 404) {
        throw new Error('No data found');
    } else if (response.status === 401) {
        dispatch(routerActions.push('/login'));
        throw new Error('You need to login');
    } else if (response.status === 500) {
        throw new Error('Server error');
    } else if (response.status === 403) {
        throw new Error('Not enough rights to see this data');
    } else if (response.status === 0) {
        throw new Error('Please check your network connection');
    }

    return response;
}