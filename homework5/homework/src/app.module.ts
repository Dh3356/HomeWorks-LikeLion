import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [UsersModule, PostsModule, EmailModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
