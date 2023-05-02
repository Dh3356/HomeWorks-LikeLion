import {ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {User} from "./users.models";

@Injectable()
export class UsersService {
  private users: User[] = [];
  //회원가입 기능
  create(createUserDto: CreateUserDto) {
    const {userId, userPw, userName} = createUserDto;
    console.log(`${userId}   ${userPw}    ${userName}`);
    if(this.getUserById(userId)) {
      throw new ConflictException('User Already Exist');
    }
    const user: User = {
      userId,
      userPw,
      userName
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
    const user = this.getUserById(userId);
    if(!user){
      throw new NotFoundException("User Not Exist");
    }
    return user;
  }

  //회원 업데이트
  update(id: string, updateUserDto: UpdateUserDto) {
    const { userId, userPw, userName} = updateUserDto;
    const user = this.getUserById(id);
    if (!user) {
      throw new NotFoundException('User Not Exist');
    }
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
    const user = this.getUserById(id);
    if(!user) {
      throw new NotFoundException('User Not Exist');
    }
    this.users = this.users.filter((u) => u !== user);
    return this.users;
  }

  getUserById(id: string):User {
    return this.users.find((user) => user.userId === id);
  }
}
