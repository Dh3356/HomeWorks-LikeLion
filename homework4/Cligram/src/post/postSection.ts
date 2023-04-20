import {input} from "../input";
import {User} from "../database/userList";
import {Post, getAllPost, createPost, deletePost} from "../database/postList";

export type PostInput = Omit<Post, "id" | "writerId" | "createdAt">;

let newPostId = 1;
export const startPosting = async (nowLoginUser: User) => {
    console.log(`${nowLoginUser.name}님 환영합니다!`);
    console.log("1. 피드 보기");
    console.log("2. 게시물 작성");
    console.log("3. 게시물 삭제");
    console.log("0. 로그아웃\n");
    let option = await input("무엇을 하시겠습니까? : ");

    while(option != "0") {

        if(option === "1") {
            console.log("\n피드 보기");
            getAllPost().forEach((post) => console.log(post));
        }
        else if(option === "2") {
            console.log("\n게시물 작성");
            const inputContent = await input("내용 : ");
            createPost(nowLoginUser, inputContent, newPostId++);
            console.log("게시물 작성 완료\n");
        }
        else if(option === "3"){
            const inputId = await  input("삭제할 게시물의 ID : ");
            const result = deletePost(nowLoginUser, inputId);
            if(result === "notMatch"){
                console.log("현재 사용자의 게시물이 아닙니다.");
            }
            else if(result ==="complete"){
                console.log("삭제 완료!");
            }
            else if(result === "notExist"){
                console.log("해당 게시물은 존재하지 않습니다.")
            }
        }
        else{
            console.log("\n잘못된 입력입니다.\n");
        }
        console.log("1. 피드 보기");
        console.log("2. 게시물 작성");
        console.log("3. 게시물 삭제");
        console.log("0. 로그아웃\n");
        option = await input("무엇을 하시겠습니까? : ");
    }
    return;
};