import { Module } from '@nestjs/common';
import {UserService} from "./users/user.service";
import { UsersController } from './users/users.controller';
import {EmailService} from "./email/email.service";

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UserService, EmailService],
})
export class AppModule {}
