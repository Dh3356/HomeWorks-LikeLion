import { forwardRef, Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { UsersModule } from '../users/users.module';
import { CommentModule } from '../comment/comment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { LikeEntity } from '../like/entities/like.entity';
import { LikeModule } from '../like/like.module';

@Module({
  imports: [
    CommentModule,
    LikeModule,
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([PostEntity, LikeEntity]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
