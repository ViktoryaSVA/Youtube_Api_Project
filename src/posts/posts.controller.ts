import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get('')
    async getPosts() {
        const posts = await this.postsService.loadPosts();
        return { data: posts };
    }
}
