import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandCreateDto } from './dto/create-brand.dto';
import { BrandUpdateDto } from './dto/update-brand.dto';

@Controller('brand')
export class BrandController {
  constructor(private brandService: BrandService) {}

  @Post('create')
  createUser(@Body() data: BrandCreateDto) {
    return this.brandService.create(data);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.brandService.getOneById(id);
  }

  @Get('')
  findAll() {
    return this.brandService.findAll();
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.brandService.delete(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: BrandUpdateDto) {
    return this.brandService.update(id, data);
  }

  @Post('insert-brand')
  insert() {
    return this.brandService.insertBrand();
  }
}
