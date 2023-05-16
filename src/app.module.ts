import { Module } from '@nestjs/common';
import { config } from 'dotenv';

config();
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './account/account.module';
import {AccountEntity} from './account/entities/account.entity';
import {AccountsController} from "./account/account.controller";
import {AccountService} from "./account/account.service";
import {PostEntity} from "./posts/entities/post.entity";
import {SourceEntity} from "./sources/entities/source.entity";
import {HttpModule, HttpService} from "@nestjs/axios";
import {SourcesService} from "./sources/sources.service";
import {PostsService} from "./posts/posts.service";
import {PostsController} from "./posts/posts.controller";
import {PostsModule} from "./posts/posts.module";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            autoLoadEntities: true,
            synchronize: true,
        }),
        TypeOrmModule.forFeature([AccountEntity, SourceEntity, PostEntity]),
        AccountModule,
        PostsModule,
        HttpModule
    ],
    controllers: [AccountsController, PostsController],
    providers: [AccountService, SourcesService, PostsService],
})
export class AppModule {}
