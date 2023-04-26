import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category-product.dto';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category-product.dto';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post('create')
  createUser(@Body() data: CreateCategoryDto) {
    return this.categoryService.create(data);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.categoryService.getOneById(id);
  }

  @Get('')
  findAll() {
    return this.categoryService.findAll();
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.categoryService.delete(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: UpdateCategoryDto) {
    return this.categoryService.update(id, data);
  }

  @Post('insert-cate')
  insert() {
    return this.categoryService.insertCate();
  }
}
