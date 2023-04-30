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
import { CouponUpdateDto } from './dto/update-coupon.dto';
import { CouponCreateDto } from './dto/create-coupon.dto';
import { CouponService } from './coupon.service';
import { JWTAuthGuard } from '../auth/guard/jwt.guard';
import { RoleGuardAdmin } from '../auth/guard/checkrole.guard';

@Controller('coupon')
export class CouponController {
  constructor(private couponService: CouponService) {}

  @UseGuards(JWTAuthGuard, RoleGuardAdmin)
  @Post('create')
  createCoupon(@Body() data: CouponCreateDto) {
    return this.couponService.create(data);
  }

  @UseGuards(JWTAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.couponService.getOneById(id);
  }

  @Get('')
  findAll() {
    return this.couponService.findAll();
  }

  @UseGuards(JWTAuthGuard, RoleGuardAdmin)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.couponService.delete(id);
  }

  @UseGuards(JWTAuthGuard, RoleGuardAdmin)
  @Put(':id')
  update(@Param('id') id: number, @Body() data: CouponUpdateDto) {
    return this.couponService.update(id, data);
  }
}
