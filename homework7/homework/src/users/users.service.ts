import {
  forwardRef,
  Inject,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.models';
import { AuthService } from '../auth/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(newUser: User) {
    const userData = await this.usersRepository.createQueryBuilder()
        .where("id = :userId", { userId: newUser.userId })
        .getOne();
    if (userData) {
      throw new NotAcceptableException('User Already Exist');
    }
    const user: UserEntity = new UserEntity();
    user.id = newUser.userId;
    user.password = newUser.userPw;
    user.email = newUser.userEmail;
    user.name = newUser.userName;
    user.createdAt = newUser.createdAt;
    user.updatedAt = newUser.updatedAt;
    await this.usersRepository.save(user);
    return newUser;
  }

  //전체 회원 보기
  async findAll() {
    return await this.usersRepository.query(`SELECT * FROM user`);
  }

  //특정 회원 정보
  async findOne(userId: string) {
    const userData = await this.usersRepository.createQueryBuilder()
        .where("id = :userId", { userId: userId })
        .getOne();
    if (!userData) {
      throw new NotFoundException('User Not Exist');
    }
    return userData;
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.usersRepository.createQueryBuilder()
        .delete()
        .from("user")
        .where("id = :userId", { userId: id })
        .execute();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { userId, userPw, userName, userEmail } = updateUserDto;
    const user = await this.findOne(id);
    await this.remove(id);
    user.id = userId;
    user.password = userPw;
    user.name = userName;
    user.email = userEmail;
    user.updatedAt = new Date;
    await this.usersRepository.save(user);
  }
}
