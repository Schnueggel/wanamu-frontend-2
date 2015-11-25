
export class BaseModel<T> implements wu.model.data.IBaseModel {

    /**
     * IndexAccess for Models
     */
    [index: string] : any;

    __orgValues : {[index:string] : { value : any, dirty : boolean}} = {};


    private _dirty: boolean = false;

    /**
     * This method will only exist if at least one Json decorator is set on a property
     * @generated
     */
    toJSON : Function;

    private _changeStateStream:Rx.Subject<T>;

    constructor() {
        this._changeStateStream = new Rx.Subject<T>();
    }

    /**
     * @virtual
     * @param data
     */
    fromJSON (data: any) : void {}

    notify() {
        this._changeStateStream.onNext(this as any);
    }

    public get dirty():boolean {
        return this._dirty;
    }

    public set dirty(value:boolean) {
        this._dirty = value;
    }

    get changeStateStream():Rx.Subject<T> {
        return this._changeStateStream;
    }

    set changeStateStream(value:Rx.Subject<T>) {
        this._changeStateStream = value;
    }
}
