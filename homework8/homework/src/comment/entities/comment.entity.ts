import {Column, Entity, ManyToOne, PrimaryColumn} from 'typeorm';
import {UserEntity} from "../../users/entities/user.entity";
import {PostEntity} from "../../posts/entities/post.entity";

@Entity("Comment")
export class CommentEntity {
    @PrimaryColumn()
    id: string;

    @ManyToOne(() => UserEntity, (user) => user.posts)
    user: UserEntity;

    @ManyToOne(()=>PostEntity, (post)=>post.comments)
    post: PostEntity;

    @Column({length: 100})
    content: string;
}