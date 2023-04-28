"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startPosting = void 0;
const input_1 = require("./input");
const postList_1 = require("./postList");
let newPostId = 1;
const startPosting = async (nowLoginUser) => {
    console.log(`${nowLoginUser.name}님 환영합니다!`);
    console.log("1. 피드 보기");
    console.log("2. 게시물 작성");
    console.log("3. 게시물 삭제");
    console.log("0. 로그아웃\n");
    let option = await (0, input_1.input)("무엇을 하시겠습니까? : ");
    while (option != "0") {
        if (option === "1") {
            console.log("\n피드 보기");
            (0, postList_1.getAllPost)().forEach((post) => console.log(post));
        }
        else if (option === "2") {
            console.log("\n게시물 작성");
            const inputContent = await (0, input_1.input)("내용 : ");
            (0, postList_1.createPost)(nowLoginUser, inputContent, newPostId++);
            console.log("게시물 작성 완료\n");
        }
        else if (option === "3") {
            const inputId = await (0, input_1.input)("삭제할 게시물의 ID : ");
            const result = (0, postList_1.deletePost)(nowLoginUser, inputId);
            if (result === "notMatch") {
                console.log("현재 사용자의 게시물이 아닙니다.");
            }
            else if (result === "complete") {
                console.log("삭제 완료!");
            }
            else if (result === "notExist") {
                console.log("해당 게시물은 존재하지 않습니다.");
            }
        }
        else {
            console.log("\n잘못된 입력입니다.\n");
        }
        console.log("1. 피드 보기");
        console.log("2. 게시물 작성");
        console.log("3. 게시물 삭제");
        console.log("0. 로그아웃\n");
        option = await (0, input_1.input)("무엇을 하시겠습니까? : ");
    }
    return;
};
exports.startPosting = startPosting;
