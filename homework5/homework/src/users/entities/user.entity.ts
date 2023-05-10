import { AST } from 'eslint';
import Token = AST.Token;

export class User {
  userId: string;
  userPw: string;
  userName: string;
  userEmail: string;
  isAdmin: boolean;
}
