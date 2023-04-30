import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Tag from 'src/entities/tab.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepo: Repository<Tag>,
  ) {}

  async createTag(data: any) {
    const tag = await this.tagRepo.create(data);
    await this.tagRepo.save(tag);
    return tag;
  }
}
