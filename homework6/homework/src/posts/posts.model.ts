import { Comment } from './comments.model';

export interface Post {
  id: number;
  writerId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
