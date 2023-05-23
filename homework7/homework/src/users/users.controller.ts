/* eslint-disable */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
    Headers,
  Delete, ValidationPipe, Head,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import {AuthService} from "../auth/auth.service";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly authService: AuthService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':userId')
  async findOne(@Headers() headers: any,  @Param('userId')userId: string):Promise<any>{
    const jwtString = headers.authorization.split('Bearer ')[1];
    return this.authService.verify(jwtString, userId);
  }

  @Patch('/:userId')
  update(
    @Param('userId') userId: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(userId, updateUserDto);
  }
}
