import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AccountEntity } from "../../account/entities/account.entity";

@Entity('Sources')
export class SourceEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'Name', nullable: true })
    name?: string;

    @Column({ name: 'Type', nullable: true })
    type?: string;

    @OneToMany(() => AccountEntity, (account) => account.source)
    accounts: AccountEntity[];
}
