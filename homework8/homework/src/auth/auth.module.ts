import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EmailModule } from '../email/email.module';
import { UsersModule } from '../users/users.module';
import {ConfigModule} from "@nestjs/config";
import emailConfig from "../config/emailConfig";
import authConfig from "../config/authConfig";

@Module({
  imports: [EmailModule, forwardRef(() => UsersModule),ConfigModule.forRoot({
    load: [authConfig],
  }),],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
