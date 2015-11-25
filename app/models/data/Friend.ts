import _ = require('lodash');
import { Profile } from 'models/data/Profile';
import { BaseModel }  from 'models/data/BaseModel';
import { Dirty, Json } from 'models/decorators/decorators';

/**
 * Friend Model
 */
export class Friend extends BaseModel<Friend> implements wu.model.data.IFriend {

    private _id : number;
    private _Profile : wu.model.data.IProfile;
    private _Friends : wu.model.data.IFriendsData;

    /**
     *
     * @param data
     */
    constructor(data?: wu.model.data.IFriendData){
        super();
        if (_.isPlainObject(data)){
            this.fromJSON(data);
        }
    }

    /**
     *
     * @param d
     */
    public fromJSON(d: wu.model.data.IFriendData) {
        let data = d || <wu.model.data.IFriendData>{};

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
    public get Profile() : wu.model.data.IProfile {
        return this._Profile;
    }

    public set Profile(value:wu.model.data.IProfile) {
        this._Profile = value;
    }

    @Dirty
    @Json
    public get Friends():wu.model.data.IFriendsData {
        return this._Friends;
    }

    public set Friends(value:wu.model.data.IFriendsData) {
        this._Friends = value;
    }
}
