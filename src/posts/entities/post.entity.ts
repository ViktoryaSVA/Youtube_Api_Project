import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { AccountEntity } from '../../account/entities/account.entity';
@Entity()
export class PostEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    accountId: number;

    @Column({ nullable: true })
    text: string;

    @Column({ nullable: true })
    title: string;

    @Column()
    link?: string;

    @Column()
    description?: string;

    @Column({ nullable: true })
    publishedAt: string;

    @Column({ nullable: true })
    videoId: number;

    @ManyToOne(() => AccountEntity, account => account.posts)
    account: AccountEntity;
}
