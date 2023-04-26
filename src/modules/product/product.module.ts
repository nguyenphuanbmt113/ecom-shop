import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Product from 'src/entities/product.entity';
import { CategoryModule } from '../category/category.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { BrandModule } from '../brand/brand.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CategoryModule, BrandModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
