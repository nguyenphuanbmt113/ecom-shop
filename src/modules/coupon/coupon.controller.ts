import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CouponUpdateDto } from './dto/update-coupon.dto';
import { CouponCreateDto } from './dto/create-coupon.dto';
import { CouponService } from './coupon.service';

@Controller('coupon')
export class CouponController {
  constructor(private couponService: CouponService) {}

  @Post('create')
  createCoupon(@Body() data: CouponCreateDto) {
    return this.couponService.create(data);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.couponService.getOneById(id);
  }

  @Get('')
  findAll() {
    return this.couponService.findAll();
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.couponService.delete(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: CouponUpdateDto) {
    return this.couponService.update(id, data);
  }
}
