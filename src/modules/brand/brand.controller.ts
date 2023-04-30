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
import { BrandService } from './brand.service';
import { BrandCreateDto } from './dto/create-brand.dto';
import { BrandUpdateDto } from './dto/update-brand.dto';
import { JWTAuthGuard } from '../auth/guard/jwt.guard';
import { RoleGuardAdmin } from '../auth/guard/checkrole.guard';

@Controller('brand')
export class BrandController {
  constructor(private brandService: BrandService) {}

  @UseGuards(JWTAuthGuard, RoleGuardAdmin)
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

  @UseGuards(JWTAuthGuard, RoleGuardAdmin)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.brandService.delete(id);
  }

  @UseGuards(JWTAuthGuard, RoleGuardAdmin)
  @Put(':id')
  update(@Param('id') id: number, @Body() data: BrandUpdateDto) {
    return this.brandService.update(id, data);
  }

  @UseGuards(JWTAuthGuard, RoleGuardAdmin)
  @Post('insert-brand')
  insert(): Promise<string> {
    return this.brandService.insertBrand();
  }
}
