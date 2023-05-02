import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import {UsersService} from "../users/users.service";
import {UsersModule} from "../users/users.module";

@Module({
  controllers: [PostsController],
  providers: [PostsService, UsersService]
})
export class PostsModule {}
