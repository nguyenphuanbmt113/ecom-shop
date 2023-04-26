import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import Brand from 'src/entities/brand.entity';
import Category from 'src/entities/category.entity';
import Color from 'src/entities/color.entity';
import Coupon from 'src/entities/coupon.entity';
import Product from 'src/entities/product.entity';
import User from 'src/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [User, Coupon, Color, Category, Brand, Product],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
