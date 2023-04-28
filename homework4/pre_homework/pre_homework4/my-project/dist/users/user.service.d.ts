import { EmailService } from "../email/email.service";
import { UserInfo } from "./UserInfo";
export declare class UserService {
    private emailService;
    constructor(emailService: EmailService);
    createUser(name: string, email: string, password: string): Promise<void>;
    private checkUserExists;
    private saveUser;
    private sendMemberJoinEmail;
    login(email: string, password: string): Promise<string>;
    getUserInfo(userId: String): Promise<UserInfo>;
}
