import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import Tag from 'src/entities/tab.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import TagProduct from 'src/entities/tagProduct.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tag]),
    TypeOrmModule.forFeature([TagProduct]),
  ],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
