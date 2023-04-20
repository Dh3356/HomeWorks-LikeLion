declare const dexter: {
    name: string;
    age: number;
    hobby: string[];
};
type NonString<T> = T extends string ? never : T;
declare const user1: {
    name: string;
    age: number;
};
interface User {
    name: string;
    age: number;
}
declare const user: User;
declare class User {
    constructor(name: string, age: number);
}
declare const user3: User;
type MyUser = User;
declare function getLength(obj: string | string[]): number;
type Status = "Ready" | "Waiting";
declare enum Status1 {
    READY = "Ready",
    WAITING = "Waiting"
}
declare function identity(arg: any): any;
declare function identity1<T>(arg: T): T;
