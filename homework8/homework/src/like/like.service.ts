import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from '../comment/entities/comment.entity';
import { Repository } from 'typeorm';
import { LikeEntity } from './entities/like.entity';
import * as uuid from 'uuid';
import { PostEntity } from '../posts/entities/post.entity';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(LikeEntity)
    private likeRepository: Repository<LikeEntity>,
  ) {}
  async create(post: PostEntity, user: UserEntity) {
    if (
      await this.likeRepository
        .createQueryBuilder()
        .where('postId = :postId', { postId: post.id })
        .where('userId= :userId', { userId: user.id })
        .getOne()
    ) {
      throw new NotAcceptableException('Already Like Post');
    }
    const newLike: LikeEntity = new LikeEntity();
    newLike.id = uuid.v1();
    newLike.post = post;
    newLike.user = user;
    newLike.createdAt = new Date();
    await this.likeRepository.save(newLike);
  }

  async findOne(postId: string, userId: string) {
    const likeData = await this.likeRepository
      .createQueryBuilder()
      .where('postId = :postId', { postId: postId })
      .where('userId= :userId', { userId: userId })
      .getOne();
    if (!likeData) {
      throw new NotFoundException('Like Not Exist');
    }
    return likeData;
  }

  async remove(post: PostEntity, user: UserEntity) {
    const likeData = await this.getLike(post.id, user.id);
    await this.likeRepository
      .createQueryBuilder()
      .delete()
      .from('like')
      .where('id = :likeId', { likeId: likeData.id })
      .execute();
  }

  async getLike(postId: string, userId: string) {
    const likeData = await this.likeRepository
      .createQueryBuilder()
      .where('userId = :userId', { userId: userId })
      .andWhere('postId = :postId', { postId: postId })
      .getOne();
    if (!likeData) {
      throw new NotFoundException('Comment Not Exist');
    }
    return likeData;
  }
}
