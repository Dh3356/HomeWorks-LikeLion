/* eslint-disable */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Headers,
  Delete, ValidationPipe, Head, Inject, InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import {AuthService} from "../auth/auth.service";
import {WINSTON_MODULE_NEST_PROVIDER} from "nest-winston";
import {Logger as WinstonLogger} from "winston";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly authService: AuthService, @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: WinstonLogger) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':userId')
  async findOne(@Headers() headers: any,  @Param('userId')userId: string):Promise<any>{
    this.printWinstonLog(userId);
    const jwtString = headers.authorization.split('Bearer ')[1];
    return this.authService.verify(jwtString, userId);
  }

  @Patch('/:userId')
  update(
    @Param('userId') userId: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    this.printWinstonLog(userId, updateUserDto);
    return this.usersService.update(userId, updateUserDto);
  }

  private printWinstonLog(...contents: any[]){
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
