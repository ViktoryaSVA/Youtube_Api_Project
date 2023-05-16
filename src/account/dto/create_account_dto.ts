import { AccountEntity } from "../entities/account.entity";

export class CreateAccountDto extends AccountEntity{
    readonly link: string;
    readonly channelId: string;
    readonly sourceId: number;
    readonly title: string;
    readonly subscribers: number;
}
