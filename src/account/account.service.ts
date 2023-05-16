import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from './entities/account.entity';
import { PostEntity } from '../posts/entities/post.entity';
import { google } from 'googleapis';
import { HttpService } from '@nestjs/axios';
import { SourceEntity } from "../sources/entities/source.entity";
import { CreateAccountDto } from "./dto/create_account_dto";
const axios = require('axios');

@Injectable()
export class AccountService {
    private youtube_v3 = google.youtube({
        version: 'v3',
        auth: process.env.YOUTUBE_API_KEY
    });

    constructor(
        @InjectRepository(AccountEntity)
        private accountRepository: Repository<AccountEntity>,
        @InjectRepository(SourceEntity)
        private sourcesRepository: Repository<SourceEntity>,
        @InjectRepository(PostEntity)
        private postsRepository: Repository<PostEntity>,
        private readonly httpService: HttpService
    ) {}

    async getAccounts(): Promise<AccountEntity[]> {
        return this.accountRepository.find();
    }
    async createAccount(account: CreateAccountDto): Promise<AccountEntity> {
        const newAccount = new AccountEntity();
        newAccount.channelId = account.channelId;
        newAccount.link = account.link;

        const savedSources = await this.sourcesRepository.save({ accounts: [account] })
        newAccount.sourceId = savedSources.id;
        const savedAccount = await this.accountRepository.save(newAccount);
        return savedAccount;
    }
    async updateAccount(accountId: number): Promise<AccountEntity> {
        let youtubeChannelId;
        const account = await this.accountRepository.findOne({ where: { id: accountId } });
        const source = await this.sourcesRepository.findOne({ where: { id: account.sourceId } });
        if (!account && !source) {
            throw new Error(`Account with id ${accountId} not found`);
        }

        if (account.channelId) {
            youtubeChannelId = account.channelId;
        } else {
            youtubeChannelId = await this.getChannelIdByLink(account.link);
            account.channelId = youtubeChannelId;
        }

        const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${youtubeChannelId}&key=${process.env.YOUR_PRIVATE_KEY}`;
        const response = await this.httpService.get(url).toPromise();
        const { data } = response;
        if (!data.items || data.items.length === 0) {
            throw new Error(`No channel found for id ${youtubeChannelId}`);
        }
        const channel = data.items[0];
        account.title = channel.snippet.title;
        account.subscribers = parseInt(channel.statistics.subscriberCount, 10);
        return this.accountRepository.save(account);
    }
    async updateAllAccounts(): Promise<void> {
        const accounts = await this.accountRepository.find();

        for (const account of accounts) {
            let youtubeChannelId;
            const source = await this.sourcesRepository.findOne({ where: { id: account.sourceId } });
            if (!account || !source) {
                throw new Error(`Account with id ${account.id} not found or has no associated source`);
            }

            if (account.channelId) {
                youtubeChannelId = account.channelId;
            } else {
                youtubeChannelId = await this.getChannelIdByLink(account.link);
                account.channelId = youtubeChannelId;
            }

            const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${youtubeChannelId}&key=${process.env.YOUR_PRIVATE_KEY}`;
            const response = await this.httpService.get(url).toPromise();
            const { data } = response;
            if (!data.items || data.items.length === 0) {
                throw new Error(`No channel found for id ${youtubeChannelId}`);
            }
            const channel = data.items[0];
            account.title = channel.snippet.title;
            account.subscribers = parseInt(channel.statistics.subscriberCount, 10);
            await this.accountRepository.save(account);
        }
    }
    async getChannelIdByLink(link) {
        const query = encodeURIComponent(link);
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${query}&key=${process.env.YOUR_PRIVATE_KEY}`;
        const response = await axios.get(url);
        const { data } = response;
        if (!data.items || data.items.length === 0) {
            throw new Error(`No channel found for link ${link}`);
        }
        return data.items[0].snippet.channelId;
    }
}
