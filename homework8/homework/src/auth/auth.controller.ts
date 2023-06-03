import {Controller, Post, Body, Delete, Headers, Res, Inject, InternalServerErrorException} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import {Response} from "express";
import {WINSTON_MODULE_NEST_PROVIDER, } from "nest-winston";
import{Logger as WinstonLogger} from 'winston';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: WinstonLogger) {}

  @Post('/regist')
  regist(@Body() createUserDto: CreateUserDto) {
    this.printWinstonLog({contents: [createUserDto]});
    return this.authService.regist(createUserDto);
  }

  @Delete('/delete')
  delete(@Headers('userId') userId: string) {
    this.printWinstonLog({contents: [userId]});
    return this.authService.delete(userId);
  }

  @Post('/login')
  logIn(@Headers('userId') userId: string, @Headers('userPw') userPw: string, @Res() res: Response) {
    this.printWinstonLog({contents: [userId, userPw]});
    return this.authService.logIn(userId, userPw, res);
  }

  @Post('/logout')
  logOut(@Headers('userId') userId: string, @Res() res: Response) {
    this.printWinstonLog({contents: [userId]});
    return this.authService.logOut(userId, res);
  }

  private printWinstonLog({contents: contents}: { contents?: any[] }){
    try{
      throw new InternalServerErrorException('test');
    }
    catch (e){
      this.logger.error('error: '+ JSON.stringify(contents), e.stack);
    }
    this.logger.warn('warn: '+ JSON.stringify(contents));
    this.logger.verbose('verbose: '+ JSON.stringify(contents));
    this.logger.debug('debug: '+ JSON.stringify(contents));
  }
}
