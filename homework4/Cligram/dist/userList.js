"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.findUser = exports.userList = void 0;
exports.userList = [];
const findUser = (tryingUser) => {
    const filtered = exports.userList.filter((user) => (user.email === tryingUser.email && user.password === tryingUser.password));
    return !filtered.length ? null : filtered[0];
};
exports.findUser = findUser;
const createUser = (inputName, inputEmail, inputPassword, newUserId) => {
    exports.userList.push({
        name: inputName,
        email: inputEmail,
        password: inputPassword,
        id: newUserId
    });
};
exports.createUser = createUser;
