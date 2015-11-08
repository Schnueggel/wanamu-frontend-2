import { BaseModel }  from './BaseModel';
import { Dirty, Json } from './decorators/decorators';

export class Setting extends BaseModel implements wu.model.ISetting {

    private _id : number;
    private _color1 : string = 'rgba(255, 223, 2, 0.8)';
    private _color2 : string = 'rgba(0, 128, 0, 0.8)';
    private _color3 : string = 'rgba(255, 0, 0, 0.8)';
    private _color4 : string = 'rgba(0, 90, 255, 0.8)';
    private _color5 : string = 'rgba(0, 0, 0, 0.8)';

    /**
     *
     * @param data
     */
    constructor(data : wu.model.ISettingData){
        super();
        this.fromJSON(data);
    }

    /**
     *
     * @param data
     */
    public fromJSON(data : wu.model.ISettingData) : void {
        var data = data || <wu.model.ISettingData>{};

        this._id = data.id;
        this._color1 = data.color1;
        this._color2 = data.color2;
        this._color3 = data.color3;
        this._color4 = data.color4;
        this._color5 = data.color5;
    }
    /**
     * Returns all colors as an array
     * @returns {{}}
     */
    public colors() : wu.model.IColor {
        return {
            color1: this._color1,
            color2: this._color2,
            color3: this._color3,
            color4: this._color4,
            color5: this._color5
        };
    }

    /**
     *
     * @param color
     * @returns {String}
     */
    public color(color : string) : string {
        if(color === '_color1'){
           return this._color1;
        }
        else if(color === '_color2'){
            return this._color2;
        }
        else if (color === '_color3'){
            return this._color3;
        }
        else if(color === '_color4'){
            return this._color4;
        }
        else if(color === '_color5'){
            return this._color5;
        }
        else {
            console.warn('Invalid color field selected: ' + color);
            return this._color1;
        }
    }

    @Json
    public get id():number {
        return this._id;
    }

    public set id(value : number) {
        console.warn('Field id is readonly');
    }

    @Dirty
    @Json
    public get color1() : string {
        return this._color1;
    }

    public set color1(value:string) {
        this._color1 = value;
    }

    @Dirty
    @Json
    public get color2():string {
        return this._color2;
    }

    public set color2(value:string) {
        this._color2 = value;
    }

    @Dirty
    @Json
    public get color3():string {
        return this._color3;
    }

    public set color3(value:string) {
        this._color3 = value;
    }

    @Dirty
    @Json
    public get color4():string {
        return this._color4;
    }

    public set color4(value:string) {
        this._color4 = value;
    }

    @Dirty
    @Json
    public get color5():string {
        return this._color5;
    }

    public set color5(value:string) {
        this._color5 = value;
    }
}
