import * as Actions from './index';
import {configRequest, configLoad} from './ConfigAction';

export function bootstrap() {
    return dispatch => {
        dispatch(configRequest());
        dispatch(configLoad());
    }
}