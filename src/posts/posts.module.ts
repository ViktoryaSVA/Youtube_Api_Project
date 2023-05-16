import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import {PostEntity} from "./entities/post.entity";
import {PostsController} from "./posts.controller";
import {AccountEntity} from "../account/entities/account.entity";
import {AccountsController} from "../account/account.controller";
import {AccountService} from "../account/account.service";
import {HttpModule, HttpService} from "@nestjs/axios";
import {Repository} from "typeorm";
import {SourceEntity} from "../sources/entities/source.entity";
import {SourcesService} from "../sources/sources.service";
import {SourcesController} from "../sources/sources.controller";

@Module({
    imports: [TypeOrmModule.forFeature([PostEntity, AccountEntity, SourceEntity]), Repository, HttpModule],
    controllers: [PostsController, AccountsController, SourcesController],
    providers: [PostsService, AccountService, SourcesService],
})
export class PostsModule {}
