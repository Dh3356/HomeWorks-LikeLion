import { forwardRef, Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { UsersModule } from '../users/users.module';
import {CommentModule} from "../comment/comment.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CommentEntity} from "../comment/entities/comment.entity";
import {PostEntity} from "./entities/post.entity";

@Module({
  imports: [CommentModule, forwardRef(() => UsersModule, ),TypeOrmModule.forFeature([PostEntity])
    ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
