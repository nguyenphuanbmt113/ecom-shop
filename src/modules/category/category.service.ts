import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Category from 'src/entities/category.entity';
import { Repository } from 'typeorm';
import { UpdateCategoryDto } from './dto/update-category-product.dto';
import { CreateCategoryDto } from './dto/create-category-product.dto';
import { dataCate } from 'src/database/data';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  async getOneById(id: number) {
    const category = await this.categoryRepo.findOne({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException();
    }
    return category;
  }

  async getOneByName(name: string) {
    const category = await this.categoryRepo.findOne({
      where: { title: name },
    });
    if (!category) {
      throw new NotFoundException();
    }
    return category;
  }

  async findAll() {
    const category = await this.categoryRepo.find();
    return category;
  }

  async delete(id: number) {
    const category = await this.getOneById(id);
    await this.categoryRepo.remove(category);
    return category;
  }

  async update(id: number, data: UpdateCategoryDto) {
    const category = await this.getOneById(id);
    Object.assign(category, data);
    return this.categoryRepo.save(category);
  }

  async create(data: CreateCategoryDto) {
    const category = await this.categoryRepo.create({ ...data });
    await this.categoryRepo.save(category);
    return category;
  }

  async insertCate() {
    await this.categoryRepo
      .createQueryBuilder('cate')
      .insert()
      .values(dataCate)
      .execute();
    return 'insert cate';
  }
}
