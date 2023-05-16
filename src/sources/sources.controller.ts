import { Controller, Get, Post, Body } from '@nestjs/common';
import { SourcesService } from './sources.service';
import { SourceEntity } from './entities/source.entity';

@Controller('sources')
export class SourcesController {
    constructor(private readonly sourcesService: SourcesService) {}

    @Get()
    async findAll(): Promise<SourceEntity[]> {
        return this.sourcesService.findAll();
    }

    @Post()
    async create(@Body() source: SourceEntity): Promise<SourceEntity> {
        return this.sourcesService.create(source);
    }
}
