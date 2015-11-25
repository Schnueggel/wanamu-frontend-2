import {DirtyReset} from 'models/decorators/DirtyDecorator';
import * as Rx from 'rx';

export class BaseModel<T> implements wu.model.data.IBaseModel {

    /**
     * IndexAccess for Models
     */
    [index: string] : any;

    private _dirty: boolean = false;

    /**
     * This method will only exist if at least one Json decorator is set on a property
     * @generated
     */
    toJSON : Function;

    private _changeDataStream:Rx.Subject<T>;

    constructor() {
        this._changeDataStream = new Rx.Subject<T>();
    }

    /**
     * @virtual
     * @param data
     */
    fromJSON (data: any) : void {}

    /**
     * This method will trigger the changeDataStream on changes of any property decorated with the Notify decorator
     */
    notify() {
        this._changeDataStream.onNext(this as any);
    }

    /**
     * Resets the dirty valu
     */
    @DirtyReset
    resetDirty() {
        this.dirty = false;
    }

    /**
     * Returns true if data in this model has changed. If you want to set the current state of the model to non dirty use the resetDirty method.
     * @returns {boolean}
     */
    get dirty():boolean {
        return this._dirty;
    }

    set dirty(value:boolean) {
        this._dirty = value;
    }

    get changeDataStream():Rx.Subject<T> {
        return this._changeDataStream;
    }

    set changeDataStream(value:Rx.Subject<T>) {
        this._changeDataStream = value;
    }
}
