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
import { ColorService } from './color.service';
import { ColorCreateDto } from './dto/create-color.dto';
import { ColorUpdateDto } from './dto/update-color.dto';
import { RoleGuardAdmin } from '../auth/guard/checkrole.guard';
import { JWTAuthGuard } from '../auth/guard/jwt.guard';

@Controller('color')
export class ColorController {
  constructor(private colorService: ColorService) {}

  @UseGuards(JWTAuthGuard, RoleGuardAdmin)
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

  @UseGuards(JWTAuthGuard, RoleGuardAdmin)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.colorService.delete(id);
  }

  @UseGuards(JWTAuthGuard, RoleGuardAdmin)
  @Put(':id')
  update(@Param('id') id: number, @Body() data: ColorUpdateDto) {
    return this.colorService.update(id, data);
  }

  @UseGuards(JWTAuthGuard, RoleGuardAdmin)
  @Post('insert-color')
  insert() {
    return this.colorService.insertColor();
  }
}
