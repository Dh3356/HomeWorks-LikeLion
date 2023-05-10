import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.models';
import { EmailService } from '../email/email.service';

@Injectable()
export class UsersService {
  constructor(private readonly emailService: EmailService) {}
  private users: User[] = [];

  //이메일 보내기
  async sendEmail(email: string) {
    return await this.emailService.send(email);
  }

  //회원가입 기능
  async create(createUserDto: CreateUserDto) {
    const { userId, userPw, userName, userEmail } = createUserDto;
    if (this.users.find((user) => user.userId === userId)) {
      throw new ConflictException('User Already Exist');
    }
    await this.sendEmail(userEmail);
    const user: User = {
      userId,
      userPw,
      userName,
      userEmail,
    };

    this.users.push(user);
    return user;
  }

  //전체 회원
  findAll() {
    return this.users;
  }

  //특정 회원 정보
  findOne(userId: string) {
    const user = this.users.find((user) => user.userId === userId);
    if (!user) {
      throw new NotFoundException('User Not Exist');
    }
    return user;
  }

  //회원 업데이트
  update(id: string, updateUserDto: UpdateUserDto) {
    const { userId, userPw, userName } = updateUserDto;
    const user = this.findOne(id);
    // 해당 유저 정보 제거 후
    this.users = this.users.filter((user) => user.userId !== id);
    console.log(this.users);
    user.userId = userId;
    user.userPw = userPw;
    user.userName = userName;
    this.users.push(user);
    return this.users;
  }

  remove(id: string) {
    const user = this.findOne(id);
    this.users = this.users.filter((u) => u !== user);
    return this.users;
  }

  isExist(id: string) {
    return !!this.users.find((user) => user.userId === id);
  }
}
