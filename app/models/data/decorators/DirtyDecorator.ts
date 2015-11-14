import * as _ from 'lodash';

/**
 * Decorates a model
 * @param target
 * @param propertyKey
 * @param descriptor
 * @returns {TypedPropertyDescriptor<any>}
 * @constructor
 */
export function Dirty (target : wu.model.data.IBaseModel, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    if (_.isUndefined(target.__orgValues)){
        target.__orgValues = {};
    }

    let setter = descriptor.set;
    let getter = descriptor.get;

    if (_.isUndefined(setter) || _.isUndefined(getter)) {
        console.warn('Dirty decorator only works on properties');
        return descriptor;
    }

    descriptor.set = function(val : any) {
        // =============================================================================================
        // We store the original value for this property
        // =============================================================================================
        if (!this.__orgValues.hasOwnProperty(propertyKey)) {
            this.__orgValues[propertyKey] = {
                value : getter.call(this),
                dirty : false
            };
        }
        // =============================================================================================
        // Check if the set value is different from the org value if yes. the this property to dirty
        // And also the complete object. Else check if the object is still dirty
        // =============================================================================================
        let orgValue = this.__orgValues[propertyKey];

        if (orgValue.value !== val) {
            orgValue.dirty = true;
            this.dirty = true;
        } else {
            orgValue.dirty = false;
            let isDirty = false;
            _.forEach(this.__orgValues, (v : any) => {
                if ( v.dirty === true ) {
                    isDirty = true;
                }
            });
            this.dirty = isDirty;
        }
        setter.call(this, val);
    };
    return descriptor;
}

/**
 * If this decorated method is called the dirty values for original-value-check will be set to the current values and dirty will be set to false
 * @param target
 * @param propertyKey
 * @param descriptor
 * @constructor
 */
export function DirtyReset (target : wu.model.data.IBaseModel, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    if (_.isFunction(descriptor.value)) {
        let orgmethod = descriptor.value;

        // =============================================================================================
        // Reset dirty after the decorated method is called
        // =============================================================================================
        descriptor.value = function(...args : any []){
            orgmethod.apply(this, args);
            _.forEach(this.__orgValues, (v: any, k : string) => {
                v.dirty = false;
                v.value = this[k];
            });
        };

        target.dirty = false;
    }
}
