import { Body, Controller, Post } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private tagsService: TagService) {}

  @Post('create')
  createTag(@Body() data: any) {
    return this.tagsService.createTag(data);
  }

  @Post('apply-to-product')
  applyTagToProduct(@Body() data: any) {
    const { tagIds, productId } = data;
    console.log('productId:', productId);
    console.log('tagIds:', tagIds);
    return this.tagsService.applyTagsToProduct(tagIds, productId);
  }
}
