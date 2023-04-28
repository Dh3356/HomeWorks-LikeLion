import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    getHello2(): string {
        return 'Hello user!';
    }
}