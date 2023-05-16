import {Column, Entity, OneToMany, PrimaryColumn} from 'typeorm';
import {PostEntity} from "../../posts/entities/post.entity";
@Entity('User')
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column({ length: 30 })
  name: string;

  @Column({ length: 60 })
  email: string;

  @Column({ length: 30 })
  password: string;

  @Column({ type: 'timestamp'})
  createdAt: Date;

  @Column({type: 'timestamp'})
  updatedAt: Date;

  @OneToMany(
      (type) => PostEntity,
      (post) => post.user,
  )
  posts: PostEntity[];
}
