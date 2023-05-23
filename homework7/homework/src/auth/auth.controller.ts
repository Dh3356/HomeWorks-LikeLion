import {Controller, Post, Body, Delete, Headers, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import {Response} from "express";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/regist')
  regist(@Body() createUserDto: CreateUserDto) {
    return this.authService.regist(createUserDto);
  }

  @Delete('/delete')
  delete(@Headers('userId') userId: string) {
    return this.authService.delete(userId);
  }

  @Post('/login')
  logIn(@Headers('userId') userId: string, @Headers('userPw') userPw: string, @Res() res: Response) {
    return this.authService.logIn(userId, userPw, res);
  }

  @Post('/logout')
  logOut(@Headers('userId') userId: string, @Res() res: Response) {
    return this.authService.logOut(userId, res);
  }
}
