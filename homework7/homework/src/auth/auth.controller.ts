import { Controller, Post, Body, Delete, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

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
  logIn(@Headers('userId') userId: string, @Headers('userPw') userPw: string) {
    return this.authService.logIn(userId, userPw);
  }
}
