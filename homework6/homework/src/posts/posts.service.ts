import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './posts.model';
import { UsersService } from '../users/users.service';
import { CommentPostDto } from './dto/comment-post.dto';

@Injectable()
export class PostsService {
  private posts: Post[] = [];
  private id: number = 1;
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}
  create(createPostDto: CreatePostDto, userId: string) {
    if (!userId) {
      throw new ConflictException('로그인되어있지 않습니다.');
    }
    const user = this.usersService.findOne(userId);
    const newPost: Post = {
      id: this.id++,
      writerId: user.userId,
      content: createPostDto.content,
      createdAt: new Date(),
      updatedAt: new Date(),
      likes: 0,
      comments: [],
    };
    this.posts.push(newPost);
    return newPost;
  }

  findAll() {
    return this.posts;
  }

  findOne(id: number) {
    const post = this.posts.find((post) => post.id === id);
    if (!post) {
      throw new NotFoundException('Post Not Exist');
    }
    return post;
  }

  update(id: number, updatePostDto: UpdatePostDto, userId: string) {
    this.usersService.findOne(userId);
    const post = this.findOne(id);
    if (!this.isAuthorized(post, userId)) {
      throw new UnauthorizedException('권한이 없습니다.');
    }
    const { content } = updatePostDto;
    this.posts = this.posts.filter((p) => p !== post);
    post.content = content;
    post.updatedAt = new Date();
    this.posts.push(post);
    return this.posts;
  }

  like(userId: string, id: number) {
    const post = this.findOne(id);
    this.usersService.updateLike(userId, id);
    this.posts = this.posts.filter((p) => p !== post);
    post.likes++;
    this.posts.push(post);
  }

  comment(userId: string, id: number, commentPostDto: CommentPostDto) {
    const post = this.findOne(id);
    this.posts = this.posts.filter((post) => post !== post);
    post.comments.push({
      writerId: userId,
      contents: commentPostDto.comment,
      writeAt: new Date(),
    });
    this.posts.push(post);
  }

  remove(id: number, userId: string) {
    if (!this.usersService.isExist(userId)) {
      throw new NotFoundException('User Not Exist');
    }
    const post = this.findOne(id);
    if (!this.isAuthorized(post, userId)) {
      throw new UnauthorizedException('권한이 없습니다.');
    }
    this.posts = this.posts.filter((p) => p !== post);
    return this.posts;
  }

  isAuthorized(post: Post, writerId: string) {
    return post.writerId === writerId;
  }
}
