import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { EmailModule } from './email/email.module';
import process from "process";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [UsersModule, EmailModule,TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: 3306,
    username: process.env.DATATBASE_USERNAME,
    password: process.env.DATATBASE_PASSWORD,
    database: 'user',
    entities: [__dirname + '/**/*.entity{.ts, .js'],
    synchronize: process.env.DATATBASE_SYNCHRONIZE === 'true',
  }),],
  controllers: [],
  providers: [],
})
export class AppModule {}