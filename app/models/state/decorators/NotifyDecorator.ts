'use strict';
interface INotify {
    notify() : void;
}

export function Notify <T extends INotify> (target : T, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) : void {

    const setter = descriptor.set;

    descriptor.set = function(value) {
        setter.call(this, value);
        this.notify();
    }
}
