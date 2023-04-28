import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import {EmailService} from "../email/email.service";
import {UserInfo} from "./UserInfo";

@Injectable()
export class UserService {
    constructor(private emailService: EmailService) {}
    async createUser(name: string, email: string, password: string) {
        await this.checkUserExists(email);

        const signupVerifyToken = uuid.v1();

        await this.saveUser(name, email, password, signupVerifyToken);
        await this.sendMemberJoinEmail(email, signupVerifyToken);
    }

    private checkUserExists(email: string){
        return false;
    }

    private saveUser(name: string, email: string, password: string, signupVerifyToken: string){
        return;
    }

    private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
        await this.emailService.sendMemberJoinVerification(email, signupVerifyToken);
    }

    async login(email: string, password: string): Promise<string> {
        //TODO
        //1. email, password를 가진 유저가 존재하는지 DB에서 확인하고 없다면 에러 처리
        //2. JWT를 발급

        throw new Error("Method noe implemented");
    }

    async getUserInfo(userId: String): Promise<UserInfo> {
        //TODO
        //1. userId 를 가진 유저가 존재하는지 DB에서 확인하고 없다면 에러 처리
        //2. 조회된 데이터를 UserInfo 타입으로 응답

        throw new Error("Method not implemented");
    }
}