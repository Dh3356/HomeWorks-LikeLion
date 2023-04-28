import {Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {UserService} from './user.service'
import {CreateUserDto} from "./dto/create-user.dto";
import {VerifyEmailDto} from "./dto/verify-email.dto";
import {UserLoginDto} from "./dto/user-login.dto";
import {UserInfo} from "./UserInfo";

@Controller('users')
export class UsersController {
    constructor(private userService:UserService) {}
    @Post()
    async createUser(@Body() dto: CreateUserDto): Promise<void>{
        const {name, email, password} = dto;
        await this.userService.createUser(name, email, password);
    }

    @Post('/email-verify')
    async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string> {
        const { signupVerifyToken } = dto;
        //TODO
        //1. DB에서 signupVerifyToken으로 회원 가입 처리중인 유저가 있는지 조회하고 없다면 에러 처리
        //2. 바로 로그인 상태가 되도록 JWT를 발급

        throw new Error("Method not implemented");
    }

    @Post('/login')
    async login(@Body() dto: UserLoginDto): Promise<string> {
        const {email, password} = dto;
        return await this.userService.login(email, password);
    }


    @Get('/:id')
    async getUserInfo(@Param('id') userId: string): Promise<UserInfo> {
        return await this.userService.getUserInfo(userId);
    }
}
