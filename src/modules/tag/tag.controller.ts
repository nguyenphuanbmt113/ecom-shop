import { Body, Controller, Post } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private tagsService: TagService) {}

  @Post('create')
  createUser(@Body() data: any) {
    return this.tagsService.createTag(data);
  }
}
