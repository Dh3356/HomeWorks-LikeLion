import {User} from "../users/users.models";

export interface Post {
    postId: number;
    userId: string;
    contents: string;
}