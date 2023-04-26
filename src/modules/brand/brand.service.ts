import { Injectable, NotFoundException } from '@nestjs/common';
import { BrandCreateDto } from './dto/create-brand.dto';
import { BrandUpdateDto } from './dto/update-brand.dto';
import { InjectRepository } from '@nestjs/typeorm';
import Brand from 'src/entities/brand.entity';
import { Repository } from 'typeorm';
import { dataBrand } from 'src/database/data';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private brandRepo: Repository<Brand>,
  ) {}

  async getOneById(id: number) {
    const brand = await this.brandRepo.findOne({
      where: { id },
    });
    if (!brand) {
      throw new NotFoundException();
    }
    return brand;
  }

  async getOneByName(name: string) {
    const brand = await this.brandRepo.findOne({
      where: { title: name },
    });
    if (!brand) {
      throw new NotFoundException();
    }
    return brand;
  }

  async findAll() {
    const brand = await this.brandRepo.find();
    return brand;
  }

  async delete(id: number) {
    const brand = await this.getOneById(id);
    await this.brandRepo.remove(brand);
    return brand;
  }

  async update(id: number, data: BrandUpdateDto) {
    const brand = await this.getOneById(id);
    Object.assign(brand, data);
    return this.brandRepo.save(brand);
  }

  async create(data: BrandCreateDto) {
    const brand = await this.brandRepo.create({ ...data });
    await this.brandRepo.save(brand);
    return brand;
  }

  async insertBrand() {
    await this.brandRepo
      .createQueryBuilder('brand')
      .insert()
      .values(dataBrand)
      .execute();
    return 'insert brand';
  }
}
