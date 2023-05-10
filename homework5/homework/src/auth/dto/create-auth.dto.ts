import { IsEmail, IsString, Matches, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';

export class CreateAuthDto {
  @IsString()
  @Matches(/^[A-Za-z]{2,15}$/)
  readonly userId: string;

  //@Transform(({ value, obj }) => {
  //  if (obj.password.includes(obj.name.trim())) {
  //    throw new BadRequestException('password cannot include Id');
  //  } else if (obj.password.includes(obj.name.trim())) {
  //    throw new BadRequestException('password cannot include name');
  //  }
  //})
  @IsString()
  @Matches(/^[A-Za-z\d!@#$%^&*()]{8,15}$/)
  userPw: string;

  @IsString()
  @Matches(/^[A-Za-z]{2,10}$/)
  userName: string;

  @IsString()
  @IsEmail()
  @MaxLength(60)
  userEmail: string;
}
