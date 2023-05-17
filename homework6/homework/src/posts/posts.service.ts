import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { PostEntity } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentService } from '../comment/comment.service';
import { CreateCommentDto } from '../comment/dto/create-comment.dto';
import * as uuid from 'uuid';
import { LikeService } from '../like/like.service';

@Injectable()
export class PostsService {
  constructor(
    private readonly commentService: CommentService,
    private readonly likeService: LikeService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}
  async create(createPostDto: CreatePostDto, userId: string) {
    if (!userId) {
      throw new UnauthorizedException('로그인되어있지 않습니다.');
    }
    const user = await this.usersService.findOne(userId);
    const newPost: PostEntity = new PostEntity();
    newPost.id = uuid.v1();
    newPost.user = user;
    newPost.content = createPostDto.content;
    newPost.createdAt = new Date();
    newPost.updatedAt = new Date();
    await this.postRepository.save(newPost);
    return newPost;
  }

  async findAll() {
    return await this.postRepository.query('SELECT * FROM post');
  }

  async findOne(postId: string) {
    const postData = await this.postRepository
      .createQueryBuilder()
      .where('id = :postId', { postId: postId })
      .getOne();
    if (!postData) {
      throw new NotFoundException('Post Not Exist');
    }
    return postData;
  }

  async update(postId: string, updatePostDto: UpdatePostDto, userId: string) {
    const user = await this.usersService.findOne(userId);
    const post = await this.findOne(postId);
    if (user.id !== userId) {
      throw new UnauthorizedException('권한이 없습니다.');
    }
    const { content } = updatePostDto;
    await this.postRepository
      .createQueryBuilder()
      .delete()
      .from('post')
      .where('id = :postId', { postId: postId })
      .execute();
    post.content = content;
    post.updatedAt = new Date();
    await this.postRepository.save(post);
  }
  async remove(postId: string, userId: string) {
    const user = await this.usersService.findOne(userId);
    const post = await this.findOne(postId);
    if (user.id !== userId) {
      throw new UnauthorizedException('권한이 없습니다.');
    }
    await this.postRepository
      .createQueryBuilder()
      .delete()
      .from('post')
      .where('id = :postId', { postId: postId })
      .execute();
  }

  async createComment(
    postId: string,
    createCommentDto: CreateCommentDto,
    userId: string,
  ) {
    const user = await this.usersService.findOne(userId);
    const post = await this.findOne(postId);
    await this.commentService.create(post, createCommentDto, user);
  }

  async deleteComment(postId: string, commentId: string, userId: string) {
    const user = await this.usersService.findOne(userId);
    const post = await this.findOne(postId);
    if (user.id !== userId) {
      throw new UnauthorizedException('권한이 없습니다.');
    }
    await this.commentService.remove(post, commentId, user);
  }

  async likePost(postId: string, userId: string) {
    const user = await this.usersService.findOne(userId);
    const post = await this.findOne(postId);
    await this.likeService.create(post, user);
  }

  async unLikePost(postId, userId) {
    const user = await this.usersService.findOne(userId);
    const post = await this.findOne(postId);
    await this.likeService.remove(post, user);
  }
}
