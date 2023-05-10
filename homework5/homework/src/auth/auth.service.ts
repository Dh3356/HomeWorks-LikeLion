import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { EmailService } from '../email/email.service';
import { User } from '../users/users.models';
import { UsersService } from '../users/users.service';
import { CheckAuthDto } from './dto/check-auth.dto';
import { WithdrawAuthDto } from './dto/withdraw-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly emailService: EmailService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  async sendEmail(email: string) {
    return await this.emailService.send(email);
  }

  //회원가입 기능
  async regist(createAuthDto: CreateAuthDto) {
    //유저에서 만들기
    const { userId, userPw, userName, userEmail } = createAuthDto;
    const user = {
      userId: userId,
      userPw: userPw,
      userName: userName,
      userEmail: userEmail,
      likesPostIds: [],
    };
    this.usersService.create(user);
  }

  delete(userId: string) {
    this.usersService.remove(userId);
  }

  logIn(userId: string) {
    return this.usersService.findOne(userId);
  }
}
