
declare module wu {
    module decorators {
        interface IFilterOption {
            [index:string]:Function
        }
        interface IModuleOptions {
            services? : Array<Function|Object> ;
            controller? : Array<Function>;
            modules? : Array<string>;
            directives? : Array<Function|Object>;
            filter? :  Array<IFilterOption>;
        }
        interface IServiceDescriptor {
            name: string;
            service: Function;
        }
    }
}
