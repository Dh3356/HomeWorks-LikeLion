import {User} from "../users/users.models";

export interface Post {
    id: number,
    writerId: string,
    content: string,
    createdAt: Date,
    updatedAt: Date
}