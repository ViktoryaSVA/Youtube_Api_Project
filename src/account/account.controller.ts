import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { AccountService } from './account.service';
import { SourcesService } from '../sources/sources.service';
import { PostsService } from '../posts/posts.service';
import {AccountEntity} from "./entities/account.entity";
import {CreateAccountDto} from "./dto/create_account_dto";

@Controller('accounts')
export class AccountsController {
    constructor(
        private readonly accountsService: AccountService,
        private readonly sourcesService: SourcesService,
        private readonly postsService: PostsService,
    ) {}

    @Post('createAccount')
    async create(@Body() account: CreateAccountDto): Promise<AccountEntity> {
        return this.accountsService.createAccount(account);
    }

    @Get('allAccounts')
    async getAccounts(): Promise<AccountEntity[]> {
        return this.accountsService.getAccounts();
    }
    @Post('updateAccount/:id')
    async updateAccount(@Param('id') id: number): Promise<AccountEntity> {
        return this.accountsService.updateAccount(id);
    }
}
