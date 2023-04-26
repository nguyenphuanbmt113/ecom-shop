import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Product from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { BrandService } from '../brand/brand.service';
import { CategoryService } from '../category/category.service';
import { ProductCreateDto } from './dto/create-product.dto';
import { ProductUpdateDto } from './dto/update-product.dto';
import { ParamPro } from './interface/param.interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    private categoryService: CategoryService,
    private brandService: BrandService,
  ) {}

  //lấy hết products
  async findAll() {
    const pro = await this.productRepo.find();
    return pro;
  }
  //lấy hết product bằng id
  async getOneById(id: number) {
    const pro = await this.productRepo.findOne({
      where: { id },
      relations: ['color', 'category', 'brand'],
    });
    return pro;
  }
  //lấy hết product bằng id
  async getOneBySlug(slug: string) {
    const pro = await this.productRepo.findOne({
      where: { slug },
    });
    return pro;
  }
  //lấy hết product bằng category
  async getProductsByCategory(name: string) {
    const category = await this.categoryService.getOneByName(name);
    const pro = await this.productRepo.find({
      where: { categoryId: category.id },
    });
    return pro;
  }
  //lấy hết product bằng brand
  async getProductsByBand(param: ParamPro) {
    const brand = await this.brandService.getOneByName(param.name);
    if (param.page) {
      const limit = 2;
      const offset = limit * (+param.page - 1);
      const builder = this.productRepo.createQueryBuilder('product');
      builder.offset(offset).take(limit);
      builder.where('product.brandId = :brandId', {
        brandId: `${brand.id}`,
      });
      const count = await builder.getCount();
      const products = await builder.getMany();
      return {
        data: products,
        page: +param.page,
        limit: limit,
        total: Math.ceil(count / limit),
      };
    }

    const pro = await this.productRepo.find({
      where: { brandId: brand.id },
    });
    return pro;
  }
  //tạo products
  async createProduct(data: ProductCreateDto) {
    const pro = await this.productRepo.create(data);
    await this.productRepo.save(pro);
    return pro;
  }
  //cập nhật tite, price, description, color, category, brand, product
  async updateProduct(id: number, data: ProductUpdateDto) {
    const pro = await this.getOneById(id);
    Object.assign(pro, data);
    await this.productRepo.save(pro);
    return pro;
  }
  //delete product
  async deleteProduct(id: number) {
    const pro = await this.getOneById(id);
    await this.productRepo.remove(pro);
    return pro;
  }
  //filter_sort_pagination
  async getProductQuery(query: any) {
    const queryfilter = this.productRepo.createQueryBuilder('product');
    if (query.title) {
      queryfilter.where('product.title LIKE :title', {
        title: `%${query.title}%`,
      });
    }
    const products = await queryfilter.getMany();
    return products;
  }
}
