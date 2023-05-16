import {Column, Entity, ManyToOne, PrimaryColumn} from 'typeorm';
import {UserEntity} from "../../users/entities/user.entity";

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
}
