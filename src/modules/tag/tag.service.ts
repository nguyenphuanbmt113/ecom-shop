import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Tag from 'src/entities/tab.entity';
import TagProduct from 'src/entities/tagProduct.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepo: Repository<Tag>,
    @InjectRepository(TagProduct)
    private tagProRepo: Repository<TagProduct>,
  ) {}

  async createTag(data: any) {
    const tag = await this.tagRepo.create(data);
    await this.tagRepo.save(tag);
    return tag;
  }

  async applyTagsToProduct(tagIds: any, productId: number) {
    let tagsArr = [];
    if (tagIds.length > 0) {
      tagsArr = tagIds.map((item: any) => {
        console.log('item:', item);
        return {
          productId: productId,
          tagId: item,
        };
      });
    }
    const tagsProduct = await this.tagProRepo
      .createQueryBuilder()
      .insert()
      .values(tagsArr)
      .execute();
    return tagsProduct;
  }
}
