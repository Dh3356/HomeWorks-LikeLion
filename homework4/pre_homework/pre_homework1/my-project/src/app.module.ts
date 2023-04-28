import { Module } from '@nestjs/common';
import {UserService} from "./users/user.service";
import { UsersController } from './users/users.controller';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UserService],
})
export class AppModule {}
