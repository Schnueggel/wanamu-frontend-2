import * as axios from 'axios';
import * as Err from '../errors/errors';

export class BaseDataService {

    private _axios: axios.AxiosInstance = null;

    constructor() {}

    /**
     *
     * @param response
     * @returns {any}
     */
    onResponseError(response:axios.Response) {
        switch(response.status) {
            case 401: return Promise.resolve(new Err.AuthError());
            case 403: return Promise.resolve(new Err.AccessError());
            case 500: return Promise.resolve(new Err.ServerError());
            case 0: return Promise.resolve(new Err.NetworkError());
            default: return Promise.resolve(new Err.UnknownError('Server responded with: ' + response.statusText));
        }
    }

    private createAxios() {
        this._axios = axios.create({
            withCredentials: true
        });
        this._axios.interceptors.response.use(null, this.onResponseError.bind(this));
    }

    get axios():axios.AxiosInstance {
        if (this._axios === null) {
            this.createAxios();
        }
        return this._axios;
    }

    set axios(value:axios.AxiosInstance) {
        this._axios = value;
    }
}