import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentEntity } from './entities/comment.entity';
import { PostEntity } from '../posts/entities/post.entity';
import { UserEntity } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as uuid from 'uuid';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
  ) {}
  async create(
    post: PostEntity,
    createCommentDto: CreateCommentDto,
    user: UserEntity,
  ) {
    const newComment: CommentEntity = new CommentEntity();
    newComment.post = post;
    newComment.user = user;
    newComment.content = createCommentDto.content;
    newComment.id = uuid.v1();
    await this.commentRepository.save(newComment);
  }

  async remove(post: PostEntity, commentId: string, user: UserEntity) {
    const commentData = await this.getComment(post.id, user.id);
    await this.commentRepository
      .createQueryBuilder()
      .delete()
      .from('comment')
      .where('id = :commentId', { commentId: commentData.id })
      .execute();
  }

  async getComment(postId: string, userId: string) {
    const commentData = await this.commentRepository
      .createQueryBuilder()
      .where('userId = :userId', { userId: userId })
      .andWhere('postId = :postId', { postId: postId })
      .getOne();
    if (!commentData) {
      throw new NotFoundException('Comment Not Exist');
    }
    return commentData;
  }
}
