import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeEntity } from './entities/like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LikeEntity])],
  providers: [LikeService],
  exports: [LikeService],
})
export class LikeModule {}
