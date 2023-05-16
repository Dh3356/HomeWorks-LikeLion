import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { CheckAuthDto } from './dto/check-auth.dto';
import { WithdrawAuthDto } from './dto/withdraw-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/regist')
  regist(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.regist(createAuthDto);
  }

  @Delete('/delete')
  delete(@Headers('userId') userId: string) {
    return this.authService.delete(userId);
  }

  @Post('/login')
  logIn(@Headers('userId') userId: string) {
    return this.authService.logIn(userId);
  }
}
