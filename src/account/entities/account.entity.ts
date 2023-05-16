import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { PostEntity } from "../../posts/entities/post.entity";
import { SourceEntity } from "../../sources/entities/source.entity";

@Entity()
export class AccountEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    sourceId: number;

    @Column({ nullable: true })
    channelId: string;

    @Column({ nullable: true })
    title: string;

    @Column({ nullable: true })
    link: string;

    @Column({ nullable: true })
    subscribers: number;

    @ManyToOne(() => SourceEntity, source => source.accounts)
    source: SourceEntity;

    @OneToMany(() => PostEntity, post => post.account)
    posts: PostEntity[];
}
