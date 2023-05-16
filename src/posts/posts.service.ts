import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './entities/post.entity';
import {HttpService} from "@nestjs/axios";
import {AccountEntity} from "../account/entities/account.entity";

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(PostEntity)
        private postsRepository: Repository<PostEntity>,
        @InjectRepository(AccountEntity)
        private readonly accountRepository: Repository<AccountEntity>,
        private readonly httpService: HttpService,
    ) {}
    async loadPosts(): Promise<PostEntity[]> {
        const accounts = await this.accountRepository.find();

        const startDate = new Date(2023, 4, 1);
        const endDate = new Date(2023, 4, 7);
        const posts: PostEntity[] = [];

        for (const account of accounts) {
            const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${account.channelId}&type=video&publishedAfter=${startDate.toISOString()}&publishedBefore=${endDate.toISOString()}&maxResults=50&key=${process.env.YOUR_PRIVATE_KEY}`;

            let response = await this.httpService.get(url).toPromise();
            let data = response.data;

            for (const item of data.items) {
                const post = new PostEntity();
                post.account = account;
                post.title = item.snippet.title;
                post.description = item.snippet.description;
                post.publishedAt = item.snippet.publishedAt;
                post.link = `https://www.youtube.com/watch?v=${item.id.videoId}`;
                await this.postsRepository.save(post);
                posts.push(post);
            }
        }

        return posts;
    }
};