"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startLogin = void 0;
const input_1 = require("./input");
const userList_1 = require("./userList");
const postSection_1 = require("./postSection");
let newUserId = 1;
let nowLoginUser = null;
const loginUser = (inputEmail, inputPassword) => {
    const tryingUser = {
        email: inputEmail,
        password: inputPassword
    };
    const findedUser = (0, userList_1.findUser)(tryingUser);
    if (findedUser) {
        nowLoginUser = findedUser;
        return true;
    }
    return false;
};
const startLogin = async () => {
    console.log("CLI 버전 인스타그램에 오신 여러분을 환영합니다.");
    console.log("1. 로그인");
    console.log("2. 회원가입");
    console.log("0. 그냥 나가기\n");
    let option = await (0, input_1.input)("무엇을 하시겠습니까? : ");
    while (option !== "0") {
        if (option === "1") {
            const inputEmail = await (0, input_1.input)("이메일 : ");
            const inputPassword = await (0, input_1.input)("비밀번호 : ");
            try {
                if (loginUser(inputEmail, inputPassword)) {
                    await (0, postSection_1.startPosting)(nowLoginUser);
                    nowLoginUser = null;
                }
            }
            catch (e) {
                console.log("\n로그인 실패!(" + e.message + ")\n");
            }
        }
        else if (option === "2") {
            try {
                const inputName = await (0, input_1.input)("이름 : ");
                const inputEmail = await (0, input_1.input)("이메일 : ");
                const inputPassword = await (0, input_1.input)("비밀번호 : ");
                (0, userList_1.createUser)(inputName, inputEmail, inputPassword, newUserId++);
                console.log("\n회원가입 성공!\n");
            }
            catch (e) {
                console.log("\n회원가입 실패!(" + e.message + ")\n");
            }
        }
        else {
            console.log("\n잘못된 입력입니다.\n");
        }
        console.log("1. 로그인");
        console.log("2. 회원가입");
        console.log("0. 그냥 나가기\n");
        option = await (0, input_1.input)("무엇을 하시겠습니까? : ");
    }
};
exports.startLogin = startLogin;
