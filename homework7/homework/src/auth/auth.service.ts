import {
  forwardRef,
  Inject,
  Injectable, UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { EmailService } from '../email/email.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.models';
import { CreateUserDto } from '../users/dto/create-user.dto';
import authConfig from "../config/authConfig";
import {ConfigType} from "@nestjs/config";
import {Response} from "express";
@Injectable()
export class AuthService {
  constructor(
      @Inject(authConfig.KEY) private config: ConfigType<typeof authConfig>,
    private readonly emailService: EmailService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  async sendEmail(email: string) {
    return await this.emailService.send(email);
  }

  //회원가입 기능
  async regist(createUserDto: CreateUserDto) {
    //유저에서 만들기
    const { userId, userPw, userName, userEmail } = createUserDto;
    const user: User = {
      userId: userId,
      userPw: userPw,
      userName: userName,
      userEmail: userEmail,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await this.usersService.create(user);
  }

  async delete(userId: string) {
    await this.usersService.remove(userId);
  }

  logIn(userId: string, userPw: string, res: Response) {
    const payload = {userId, userPw};
    const sign = jwt.sign(payload, this.config.JWT_SECRET, {
      expiresIn: '1d',
      audience: 'example.com',
      issuer: 'example.com'
    });
    res.setHeader('Authorization', 'Bearer '+sign);
    res.cookie('jwt',sign,{
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 //1 day
    });
    return res.send({
      message: 'success'
    });
  };

  verify(jwtString: string, id:string){
    try{
      const payload = jwt.verify(jwtString, this.config.JWT_SECRET) as (jwt.JwtPayload | string) & {userId: string, userPw: string };
      const {userId, userPw} = payload;
      if(id !== userId){
        throw new UnauthorizedException("You are not that user");
      }

      return{
        userId: userId,
        userPw: userPw
      };
    }
    catch(e){
      throw new UnauthorizedException();
    }

  }
}
