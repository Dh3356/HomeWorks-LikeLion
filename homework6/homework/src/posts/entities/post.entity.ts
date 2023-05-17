import {Column, Entity, ManyToOne, OneToMany, PrimaryColumn} from 'typeorm';
import {UserEntity} from "../../users/entities/user.entity";
import {CommentEntity} from "../../comment/entities/comment.entity";

@Entity("Post")
export class PostEntity {
    @PrimaryColumn()
    id: string;

    @Column({length: 100})
    content: string;

    @ManyToOne(() => UserEntity, (user) => user.posts)
    user: UserEntity

    @Column({ type: 'timestamp'})
    createdAt: Date;

    @Column({type: 'timestamp'})
    updatedAt: Date;

    @OneToMany(
        (type) => CommentEntity,
        (comment) => comment.post,
    )
    comments: CommentEntity[];
}
