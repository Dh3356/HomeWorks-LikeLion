const dexter = {
    name: 'Dexter Han',
    age: 21,
    hobby: ['Movie', 'Billiards'],
}

type NonString<T> = T extends string ? never : T;

const user1 = {
    name: 'Dexter',
    age: 21,
}


interface User {
    name: string;
    age: number;
}

const user: User = {
    name: 'Dexter',
    age: 21,
}

class User {
    constructor(name: string, age: number) { }
}

const user3: User = new User('Dexter', 21);

type MyUser = User;

function getLength(obj: string | string[]) {
    return obj.length;
}

type Status = "Ready" | "Waiting";

enum Status1 {
    READY = "Ready",
    WAITING = "Waiting",
}

function identity(arg: any): any {
    return arg;
}

function identity1<T>(arg: T): T {
    return arg;
}