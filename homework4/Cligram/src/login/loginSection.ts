import {input} from "../input";
import {User, findUser, createUser} from "../database/userList"
import {startPosting} from "../post/postSection";


export type UserInput = Omit<User, "id" | "name">;//User 타입에서 id와 name만 빼서 새로운 타입을 만든다

let newUserId: number = 1;
let nowLoginUser: User = null;

const loginUser = (inputEmail: string, inputPassword: string) => {
    const tryingUser: UserInput = {
        email: inputEmail,
        password: inputPassword
    };
    const findedUser: User = findUser(tryingUser);
    if(findedUser)
    {
        nowLoginUser = findedUser;
        return true;
    }
    return false;
};

export const startLogin = async () => {
    console.log("CLI 버전 인스타그램에 오신 여러분을 환영합니다.");
    let option;
    do{
        console.log("1. 로그인");
        console.log("2. 회원가입");
        console.log("0. 그냥 나가기\n");
        option = await input("무엇을 하시겠습니까? : ");
        if(option === "0"){
            continue;
        }
        else if(option === "1") {
            const inputEmail = await  input("이메일 : ");
            const inputPassword = await input("비밀번호 : ");
            try{
                if(loginUser(inputEmail, inputPassword)) {
                    await startPosting(nowLoginUser);
                    nowLoginUser = null;
                }
            }
            catch (e){
                console.log(`\n로그인 실패! (${e.message})\n`);
            }
        }
        else if(option === "2") {
            try {
                const inputName = await input("이름 : ");
                const inputEmail = await  input("이메일 : ");
                const inputPassword = await input("비밀번호 : ");
                createUser(inputName, inputEmail, inputPassword, newUserId++);
                console.log("\n회원가입 성공!\n");
            }
            catch (e) {
                console.log(`\n회원가입 실패! (${e.message})\n`);
            }
        }
        else{
            console.log("\n잘못된 입력입니다.\n");
        }
    } while(option !== "0");
};