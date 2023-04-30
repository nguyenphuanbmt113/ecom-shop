import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category-product.dto';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category-product.dto';
import { RoleGuardAdmin } from '../auth/guard/checkrole.guard';
import { JWTAuthGuard } from '../auth/guard/jwt.guard';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @UseGuards(JWTAuthGuard, RoleGuardAdmin)
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

  @UseGuards(JWTAuthGuard, RoleGuardAdmin)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.categoryService.delete(id);
  }

  @UseGuards(JWTAuthGuard, RoleGuardAdmin)
  @Put(':id')
  update(@Param('id') id: number, @Body() data: UpdateCategoryDto) {
    return this.categoryService.update(id, data);
  }

  @UseGuards(JWTAuthGuard, RoleGuardAdmin)
  @Post('insert-cate')
  insert() {
    return this.categoryService.insertCate();
  }
}
