import {ConflictException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {Post} from "./posts.model";
import {UsersService} from "../users/users.service";

@Injectable()
export class PostsService {
  private posts: Post[] = [];
  private id: number = 1;
  constructor(private readonly usersService: UsersService) {}
  create(createPostDto: CreatePostDto, userId: string) {
    if(!userId){
      throw new ConflictException("로그인되어있지 않습니다.");
    }
    const user = this.usersService.findOne(userId);
    const newPost:Post = {
      id: this.id++,
      writerId: user.userId,
      content: createPostDto.content,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    this.posts.push(newPost);
    return newPost;
  }

  findAll() {
    return this.posts;
  }

  findOne(id: number) {
    const post = this.posts.find((post) => post.id === id);
    if(!post)
    {
      throw new NotFoundException("Post Not Exist");
    }
    return post;
  }

  update(id: number, updatePostDto: UpdatePostDto, writerId: string) {
    const post = this.findOne(id);
    if(!this.isAuthorized(post, writerId)){
      throw new UnauthorizedException("권한이 없습니다.");
    }
    const {content} = updatePostDto;
    post.content = content;
    post.updatedAt = new Date();
    this.posts = this.posts.filter((p) => p !== post);
    this.posts.push(post);
    return this.posts;
  }

  remove(id: number, writerId: string) {
    const post = this.findOne(id);
    if(!this.isAuthorized(post, writerId)){
      throw new UnauthorizedException("권한이 없습니다.");
    }
    this.posts = this.posts.filter((p) => p !== post);
    return this.posts;
  }

  isAuthorized(post: Post, writerId: string){
    return post.writerId === writerId;
  }
}
