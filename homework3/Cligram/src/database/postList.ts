import {User} from "./userList";

export type Post = {
    id: number;
    writerId: number;
    content: string;
    createdAt: Date;
}

export let postList: Post[] = [];

export const getAllPost = () => {
    return postList;
};

export const createPost = (nowLoginUser: User, inputContent: string, newPostId: number) => {
    postList.push({
        id: newPostId,
        writerId: nowLoginUser.id,
        content: inputContent,
        createdAt: new Date()
    });
};

export const deletePost = (nowLoginUser: User, id: string) => {
    const filteredPost = postList.filter((i) => i.id === parseInt(id));
    if(filteredPost.length !== 0) {
        if(filteredPost[0].writerId !== nowLoginUser.id){
            return "notMatch";
        }
        else {
            postList = postList.filter((post) => post !== filteredPost[0]);
            return "complete";
        }
    }
    else {
        return "notExist";
    }
};
