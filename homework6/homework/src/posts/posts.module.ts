import { forwardRef, Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserEntity} from "../users/entities/user.entity";
import {PostEntity} from "./entities/post.entity";

@Module({
  imports: [forwardRef(() => UsersModule), TypeOrmModule.forFeature([PostEntity]),
    ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
