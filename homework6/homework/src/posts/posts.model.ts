import { Comment } from './comments.modle';

export interface Post {
  id: number;
  writerId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  comments: Comment[];
}
