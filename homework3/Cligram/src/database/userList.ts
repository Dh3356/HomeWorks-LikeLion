import {UserInput} from "../login/loginSection";

export let userList: User[] = [];

export type User = {
    name: string;
    email: string;
    password: string;
    id: number;
}

export const findUser = (tryingUser: UserInput) => {
    const filtered = userList.filter((user) => (user.email === tryingUser.email && user.password === tryingUser.password));
    return !filtered.length ? null : filtered[0];
};

export const createUser = (name: string, email: string, password: string, id: number) => {
    userList.push({
        name: name,
        email: email,
        password: password,
        id: id
    });
};