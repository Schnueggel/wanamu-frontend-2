import { BaseModel }  from './BaseModel';
import { Dirty, Json, DirtyReset } from './decorators/decorators';
import * as _ from 'lodash';

/**
 * Lookup class for salutatubs
 */
export class Salutations {
    static salutations : Array<string> = ['mr', 'mrs', 'human', 'neutrum'];
    static MR : string = 'mr';
    static MRS : string = 'mrs';
    static HUMAN : string = 'human';
    static NEUTRUM : string = 'neutrum';
}

export class Profile extends BaseModel implements wu.model.IProfile {

    _id : number;
    public _firstname : string;
    _lastname : string;
    _face : string;
    _salutation : string;

    /**
     *
     * @param data
     */
    constructor(data? : wu.model.IProfileData){
        super();
        if (_.isPlainObject(data)){
            this.fromJSON(data);
        }
    }

    /**
     *
     * @param data
     */
    @DirtyReset
    public fromJSON(data : wu.model.IProfileData) : void {
        var data = data || <wu.model.IProfileData>{};

        this._id = data.id;
        this._firstname = data.firstname;
        this._lastname = data.lastname;
        this._salutation = data.salutation;
        this._face = data.face;
    }

    @Json
    public get id():number {
        return this._id;
    }

    public set id(value:number) {
        console.warn('Field id is readonly');
    }

    @Dirty
    @Json
    public get firstname():string {
        return this._firstname;
    }

    public set firstname(value:string) {
        this._firstname = value;
    }
    @Dirty
    @Json
    public get lastname():string {
        return this._lastname;
    }

    public set lastname(value:string) {
        this._lastname = value;
    }
    @Dirty
    @Json
    public get salutation():string {
        return this._salutation;
    }

    public set salutation(value:string) {
        this._salutation = value;
    }
    @Dirty
    @Json
    public get face():string {
        return this._face;
    }

    public set face(value:string) {
        this._face = value;
    }

    /**
     * REturns firstname plus lastname
     * @returns {any}
     */
    public get name () {
        return `${this.firstname} ${this.lastname}`;
    }
}
