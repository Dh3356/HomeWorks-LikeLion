import {
  forwardRef,
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.models';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { UserEntity } from '../../entity/user.entity';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}
  private users: User[] = [];

  async create(newUser: User) {
    if (this.users.find((user) => user.userId === newUser.userId)) {
      throw new NotAcceptableException('User Already Exist');
    }
    //await this.sendEmail(userEmail);
    const user: UserEntity = new UserEntity();
    user.id = newUser.userId;
    user.password = newUser.userPw;
    user.email = newUser.userEmail;
    user.name = newUser.userName;
    await this.usersRepository.save(user);
    return newUser;
  }

  //전체 회원 보기
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

  remove(id: string) {
    const user = this.findOne(id);
    this.users = this.users.filter((u) => u !== user);
    return this.users;
  }

  isExist(id: string) {
    return !!this.users.find((user) => user.userId === id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const { userId, userPw, userName, userEmail } = updateUserDto;
    const user = this.findOne(id);
    this.users = this.users.filter((user) => user.userId !== id);
    console.log(this.users);
    user.userId = userId;
    user.userPw = userPw;
    user.userName = userName;
    user.userEmail = userEmail;
    this.users.push(user);
    return this.users;
  }

  updateLike(userId: string, postId: number) {
    const user = this.findOne(userId);
    if (user.likesPostIds.find((id) => id === postId)) {
      throw new NotAcceptableException('you already like this post');
    }
    this.users = this.users.filter((user) => user.userId === userId);
    user.likesPostIds.push(postId);
    return;
  }
}
