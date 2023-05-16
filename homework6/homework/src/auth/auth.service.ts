import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { EmailService } from '../email/email.service';
import { UsersService } from '../users/users.service';
import {User} from "../users/users.models";

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

  async logIn(userId: string) {
    return await this.usersService.findOne(userId);
  }
}
