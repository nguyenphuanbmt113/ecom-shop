import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ColorService } from './color.service';
import { ColorCreateDto } from './dto/create-color.dto';
import { ColorUpdateDto } from './dto/update-color.dto';

@Controller('color')
export class ColorController {
  constructor(private colorService: ColorService) {}

  @Post('create')
  createColor(@Body() data: ColorCreateDto) {
    return this.colorService.create(data);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.colorService.getOneById(id);
  }

  @Get('')
  findAll() {
    return this.colorService.findAll();
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.colorService.delete(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: ColorUpdateDto) {
    return this.colorService.update(id, data);
  }

  @Post('insert-color')
  insert() {
    return this.colorService.insertColor();
  }
}
