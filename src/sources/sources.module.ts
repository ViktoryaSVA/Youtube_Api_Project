import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SourceEntity } from './entities/source.entity';
import { SourcesController } from "./sources.controller";
import { SourcesService } from "./sources.service";

@Module({
    imports: [TypeOrmModule.forFeature([SourceEntity])],
    controllers: [SourcesController],
    providers: [SourcesService]
})
export class SourcesModule {}
