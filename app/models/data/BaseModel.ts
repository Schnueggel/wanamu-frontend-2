
export class BaseModel implements wu.model.data.IBaseModel {

    [index: string] : any;

    __orgValues : {[index:string] : { value : any, dirty : boolean}} = {};

    private _dirty: boolean = false;

    /**
     * This method will only exist if at least one Json decorator is set on a property
     * @generated
     */
    toJSON : Function;

    /**
     * @abstract
     * @param data
     */
    fromJSON (data: any) : void {}

    static defaultTimeFormat : string = 'YYYY-MM-DD HH:mm:ss';

    public get dirty():boolean {
        return this._dirty;
    }

    public set dirty(value:boolean) {
        this._dirty = value;
    }
}
