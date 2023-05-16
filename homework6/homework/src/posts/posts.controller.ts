import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CommentPostDto } from './dto/comment-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(
    @Body() createPostDto: CreatePostDto,
    @Headers('userId') userId: string,
  ) {
    return this.postsService.create(createPostDto, userId);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.postsService.findOne(id);
  }

  @Patch('/like/:id')
  like(@Headers('userId') userId: string, @Param('id') id: number) {
    return this.postsService.like(userId, id);
  }

  @Patch('comment/:id')
  comment(
    @Headers('userId') userId: string,
    @Param('id') id: number,
    @Body() commentPostDto: CommentPostDto,
  ) {
    return this.postsService.comment(userId, id, commentPostDto);
  }

  @Patch('updateOne/:id')
  update(
    @Param('id') id: number,
    @Body() updatePostDto: UpdatePostDto,
    @Headers('userId') userId: string,
  ) {
    return this.postsService.update(id, updatePostDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @Headers('userId') userId: string) {
    return this.postsService.remove(id, userId);
  }
}
