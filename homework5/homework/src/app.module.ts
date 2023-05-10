import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { EmailModule } from './email/email.module';
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, PostsModule, EmailModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
