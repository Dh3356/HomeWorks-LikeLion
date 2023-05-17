import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import * as process from 'process';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserEntity } from '../entity/user.entity';
import { UserEntity } from './users/entities/user.entity';
import {PostEntity} from "./posts/entities/post.entity";
import { CommentModule } from './comment/comment.module';
import {CommentEntity} from "./comment/entities/comment.entity";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATATBASE_USERNAME,
      password: process.env.DATATBASE_PASSWORD,
      database: 'user',
      entities: [UserEntity, PostEntity, CommentEntity],
      synchronize: false,
    }),
    PostsModule,
    UsersModule,
    EmailModule,
    AuthModule,
      CommentModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
