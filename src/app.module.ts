import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { BrandModule } from './modules/brand/brand.module';
import { CategoryModule } from './modules/category/category.module';
import { ColorModule } from './modules/color/color.module';
import { CouponModule } from './modules/coupon/coupon.module';
import { MailModule } from './modules/mail/mail.module';
import { ProductModule } from './modules/product/product.module';
import { UserController } from './modules/user/user.controller';
import { UserModule } from './modules/user/user.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    MailModule,
    CategoryModule,
    ColorModule,
    CouponModule,
    BrandModule,
    ProductModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
