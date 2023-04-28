import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import {UserService} from "./user.service";
import {EmailModule} from "../email/email.module";

@Module({
    imports: [EmailModule],
    controllers: [UsersController],
    providers: [UserService]
})
export class UsersModule {}
