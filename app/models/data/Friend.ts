import _ = require('lodash');
import { Profile } from './Profile';
import { BaseModel }  from './BaseModel';
import { Dirty, Json } from '../decorators/decorators';

/**
 * Friend Model
 */
export class Friend extends BaseModel implements wu.model.IFriend {

    private _id : number;
    private _Profile : wu.model.IProfile;
    private _Friends : wu.model.IFriendsData;

    /**
     *
     * @param data
     */
    constructor(data?: wu.IFriendData){
        super();
        if (_.isPlainObject(data)){
            this.fromJSON(data);
        }
    }

    /**
     *
     * @param d
     */
    public fromJSON(d: wu.IFriendData) {
        let data = d || <wu.IFriendData>{};

        this._id = data.id;

        this._Profile = new Profile(data.Profile);
        this._Friends = data.Friends;
    }

    @Json
    public get id():number {
        return this._id;
    }

    public set id(value:number) {
        console.warn('Read only');
    }

    @Json
    public get Profile() : wu.model.IProfile {
        return this._Profile;
    }

    public set Profile(value:wu.model.IProfile) {
        this._Profile = value;
    }

    @Dirty
    @Json
    public get Friends():wu.model.IFriendsData {
        return this._Friends;
    }

    public set Friends(value:wu.model.IFriendsData) {
        this._Friends = value;
    }
}
