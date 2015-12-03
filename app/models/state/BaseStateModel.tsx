import * as Rx from 'rx';

export class BaseStateModel<T> implements wu.model.state.IBaseStateModel<T> {

    private _changeStateStream: Rx.Observable<T>;
    private _changeStateStartStream: Rx.Subject<T>;

    constructor() {
        this._changeStateStartStream = new Rx.Subject<T>();
        this._changeStateStream = this._changeStateStartStream;
    }

    notify() {
        this._changeStateStartStream.onNext(this as any);
    }

    get changeStateStream():Rx.Observable<T> {
        return this._changeStateStream;
    }

    set changeStateStream(value:Rx.Observable<T>) {
        this._changeStateStream = value;
    }
}