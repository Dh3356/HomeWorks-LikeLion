import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  Inject,
  InternalServerErrorException,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreateCommentDto } from '../comment/dto/create-comment.dto';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger as WinstonLogger } from 'winston';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: WinstonLogger,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() file: CreatePostDto['file'],
    @Headers('userId') userId: string,
  ) {
    this.printWinstonLog(userId);
    createPostDto.file = file;
    return this.postsService.create(createPostDto, userId);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get('/:postId')
  findOne(@Param('postId') postId: string) {
    return this.postsService.findOne(postId);
  }

  //@Patch('/like/:id')
  //like(@Headers('userId') userId: string, @Param('id') id: number) {
  //  return this.postsService.like(userId, id);
  //}

  //@Patch('comment/:id')
  //comment(
  //  @Headers('userId') userId: string,
  //  @Param('id') id: number,
  //  @Body() commentPostDto: CommentPostDto,
  //) {
  //  return this.postsService.comment(userId, id, commentPostDto);
  //}

  @Post('/:postId/comments')
  createComment(
    @Param('postId') postId: string,
    @Body() createCommentDto: CreateCommentDto,
    @Headers('userId') userId: string,
  ) {
    this.printWinstonLog(postId, userId, createCommentDto);
    return this.postsService.createComment(postId, createCommentDto, userId);
  }

  @Delete('/:postId/comments/:commentId')
  deleteComment(
    @Param('postId') postId: string,
    @Param('commentId') commentId: string,
    @Headers('userId') userId: string,
  ) {
    this.printWinstonLog(postId, userId, commentId);
    return this.postsService.deleteComment(postId, commentId, userId);
  }

  @Post('/:postId/likes')
  likePost(@Param('postId') postId: string, @Headers('userId') userId: string) {
    this.printWinstonLog(postId, userId);
    return this.postsService.likePost(postId, userId);
  }

  @Delete('/:postId/likes')
  unLikePost(
    @Param('postId') postId: string,
    @Headers('userId') userId: string,
  ) {
    this.printWinstonLog(postId, userId);
    return this.postsService.unLikePost(postId, userId);
  }

  @Patch('updateOne/:postId')
  update(
    @Param('postId') postId: string,
    @Body() updatePostDto: UpdatePostDto,
    @Headers('userId') userId: string,
  ) {
    this.printWinstonLog(postId, userId, updatePostDto);
    return this.postsService.update(postId, updatePostDto, userId);
  }

  @Delete(':postId')
  remove(@Param('postId') postId: string, @Headers('userId') userId: string) {
    this.printWinstonLog(postId, userId);
    return this.postsService.remove(postId, userId);
  }

  private printWinstonLog(...contents) {
    try {
      throw new InternalServerErrorException('test');
    } catch (e) {
      this.logger.error('error: ' + JSON.stringify(contents), e.stack);
    }
    this.logger.warn('warn: ' + JSON.stringify(contents));
    this.logger.verbose('verbose: ' + JSON.stringify(contents));
    this.logger.debug('debug: ' + JSON.stringify(contents));
  }
}
