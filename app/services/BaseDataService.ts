import * as axios from 'axios';
import * as Err from 'errors/errors';
import { User, Profile, Setting } from 'models/data/models';

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
            case 404: return Promise.resolve(new Err.NotFoundError());
            case 422: return Promise.resolve(new Err.InvalidArgumentError());
            case 500: return Promise.resolve(new Err.ServerError());
            case 0: return Promise.resolve(new Err.NetworkError());
            default: return Promise.resolve(new Err.UnknownError(`Server responded with: ${response.statusText}`));
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

    /**
     *
     * @param data
     */
    mapUserData({id, email, DefaultTodoListId, Setting, Profile}: wu.model.data.IUserData) : wu.model.data.IUser {
        return new User({
            id,
            email,
            DefaultTodoListId,
            Setting: this.mapSettingData(Setting),
            Profile: this.mapProfileData(Profile)
        });
    }

    /**
     *
     * @param id
     * @param color1
     * @param color2
     * @param color3
     * @param color4
     * @param color5
     */
    mapSettingData({id, color1, color2, color3, color4, color5}: wu.model.data.ISettingData): wu.model.data.ISetting {
        return new Setting({
            id, color1, color2, color3, color4, color5
        });
    }

    /**
     *
     * @param id
     * @param firstname
     * @param lastname
     * @param face
     * @param salutation
     */
    mapProfileData({id, firstname, lastname, face, salutation}: wu.model.data.IProfileData) : wu.model.data.IProfile {
        return new Profile({
            id,
            firstname,
            lastname,
            face,
            salutation
        });
    }
}