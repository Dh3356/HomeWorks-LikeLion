import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {Post} from "./posts.model";
import {UsersService} from "../users/users.service";

@Injectable()
export class PostsService {
  private posts: Post[] = [];
  constructor(private readonly usersService: UsersService) {}
  create(createPostDto: CreatePostDto, userId: string) {
    return this.usersService.findAll();//유저 정보가 제대로 있는지 테스트
  }

  findAll() {
    return this.usersService.findAll();//유저 정보가 제대로 있는지 테스트
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
