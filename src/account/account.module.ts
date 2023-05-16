import {Module, OnModuleInit} from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './entities/account.entity';
import { AccountsController } from './account.controller';
import { AccountService } from './account.service';
import {SourceEntity} from "../sources/entities/source.entity";
import {PostsController} from "../posts/posts.controller";
import {SourcesController} from "../sources/sources.controller";
import {PostEntity} from "../posts/entities/post.entity";
import {PostsService} from "../posts/posts.service";
import {SourcesService} from "../sources/sources.service";
import {Repository} from "typeorm";
import {AccountsCron} from "./accounts.cron";
import {ScheduleModule} from "@nestjs/schedule";

@Module({
    imports: [TypeOrmModule.forFeature([AccountEntity, SourceEntity, PostEntity]), HttpModule, Repository, ScheduleModule.forRoot()],
    controllers: [AccountsController, PostsController, SourcesController],
    providers: [AccountService, PostsService, SourcesService, AccountsCron],
})
export class AccountModule implements OnModuleInit {
    constructor(
        private readonly accountsService: AccountService,
        private readonly accountsCron: AccountsCron,
    ) {}

    async onModuleInit() {
        try {
            await this.accountsCron.handleCron();
        } catch (e) {
            console.log(e)
        }
    }
}
