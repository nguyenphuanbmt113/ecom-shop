import { Injectable, NotFoundException } from '@nestjs/common';
import { ColorUpdateDto } from './dto/update-color.dto';
import { ColorCreateDto } from './dto/create-color.dto';
import { InjectRepository } from '@nestjs/typeorm';
import Color from 'src/entities/color.entity';
import { Repository } from 'typeorm';
import { dataColor } from 'src/database/data';

@Injectable()
export class ColorService {
  constructor(
    @InjectRepository(Color)
    private colorRepo: Repository<Color>,
  ) {}

  async getOneById(id: number) {
    const color = await this.colorRepo.findOne({
      where: { id },
    });
    if (!color) {
      throw new NotFoundException();
    }
    return color;
  }

  async findAll() {
    const color = await this.colorRepo.find();
    return color;
  }

  async delete(id: number) {
    const color = await this.getOneById(id);
    await this.colorRepo.remove(color);
    return color;
  }

  async update(id: number, data: ColorUpdateDto) {
    const color = await this.getOneById(id);
    Object.assign(color, data);
    return this.colorRepo.save(color);
  }

  async create(data: ColorCreateDto) {
    const color = await this.colorRepo.create({ ...data });
    await this.colorRepo.save(color);
    return color;
  }

  async insertColor() {
    await this.colorRepo
      .createQueryBuilder('brand')
      .insert()
      .values(dataColor)
      .execute();
    return 'insert color';
  }
}
