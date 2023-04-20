declare function Enumerable(enumerable: boolean): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
declare class Person {
    private name;
    constructor(name: string);
    get getName(): string;
    set setName(name: string);
}
declare const person: Person;
