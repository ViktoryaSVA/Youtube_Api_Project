import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SourceEntity } from './entities/source.entity';

@Injectable()
export class SourcesService {
    constructor(
        @InjectRepository(SourceEntity)
        private readonly sourceRepository: Repository<SourceEntity>,
    ) {}

    async create(source: SourceEntity): Promise<SourceEntity> {
        return this.sourceRepository.save(source);
    }

    async findAll(): Promise<SourceEntity[]> {
        return this.sourceRepository.find({ relations: ['accounts'] });
    }
}
