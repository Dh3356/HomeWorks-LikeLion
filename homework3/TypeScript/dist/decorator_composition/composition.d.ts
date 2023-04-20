declare function first(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
declare function second(): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
declare class ExampleClass {
    method(): void;
}
