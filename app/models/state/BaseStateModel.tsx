import * as Rx from 'rx';

export class BaseStateModel<T> implements wu.model.state.IBaseStateModel<T> {
    private _changeStateStream: Rx.Subject<T>;

    constructor() {
        this._changeStateStream = new Rx.Subject<T>();
    }

    notify(){
        this._changeStateStream.onNext(this as any);
    }

    get changeStateStream(): Rx.Subject<T> {
        return this._changeStateStream;
    }

    set changeStateStream(value: Rx.Subject<T>) {
        this._changeStateStream = value;
    }
}