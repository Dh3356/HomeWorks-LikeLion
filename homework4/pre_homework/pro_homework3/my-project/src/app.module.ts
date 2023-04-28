import { Module } from '@nestjs/common';
import {UserService} from "./users/user.service";
import { UsersController } from './users/users.controller';
import {EmailService} from "./email/email.service";
import {CoreModule} from "./CoreModule";
import {AppController} from "./AppController";

@Module({
  imports: [CoreModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
