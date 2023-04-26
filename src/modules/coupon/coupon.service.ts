import { Injectable, NotFoundException } from '@nestjs/common';
import { CouponCreateDto } from './dto/create-coupon.dto';
import { CouponUpdateDto } from './dto/update-coupon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import Coupon from 'src/entities/coupon.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Coupon)
    private couponRepo: Repository<Coupon>,
  ) {}

  async getOneById(id: number) {
    const coupon = await this.couponRepo.findOne({
      where: { id },
    });
    if (!coupon) {
      throw new NotFoundException();
    }
    return coupon;
  }

  async findAll() {
    const coupon = await this.couponRepo.find();
    return coupon;
  }

  async delete(id: number) {
    const coupon = await this.getOneById(id);
    await this.couponRepo.remove(coupon);
    return coupon;
  }

  async update(id: number, data: CouponUpdateDto) {
    const coupon = await this.getOneById(id);
    Object.assign(coupon, data);
    return this.couponRepo.save(coupon);
  }

  async create(data: CouponCreateDto) {
    const coupon = await this.couponRepo.create({ ...data });
    await this.couponRepo.save(coupon);
    return coupon;
  }
}
